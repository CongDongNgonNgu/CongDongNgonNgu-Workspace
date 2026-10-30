#!/usr/bin/env bash
set -euo pipefail
cd /build
mkdir source
# The host independently validates every archive member before this bounded extraction.
tar --extract --gzip --file /source.tar.gz --directory source --strip-components=1 --no-same-owner --no-same-permissions
mkdir objects
cd objects
args=(
 --disable-all --disable-autodetect --disable-network --disable-doc --disable-debug
 --disable-shared --enable-static --disable-gpl --disable-nonfree --disable-version3
 --disable-x86asm --enable-ffmpeg --enable-ffprobe --enable-avcodec --enable-avformat
 --enable-avfilter --enable-swscale --enable-swresample --enable-pthreads
 "--enable-decoder=h264,aac,mjpeg" "--enable-parser=h264,aac,mjpeg"
 "--enable-demuxer=mov,image2,jpeg_pipe" "--enable-muxer=mp4,image2,null"
 "--enable-protocol=file,pipe" "--enable-bsf=filter_units,h264_metadata"
 "--enable-encoder=mjpeg,wrapped_avframe,pcm_s16le"
 "--enable-filter=scale,format,aformat,aresample"
)
printf '%s\n' "${args[@]}" > /evidence/configure-args.txt
gcc --version > /evidence/compiler.txt
ld --version > /evidence/binutils.txt
getconf GNU_LIBC_VERSION > /evidence/builder-libc.txt
cat /etc/os-release > /evidence/builder-os.txt
printf 'CONFIGURE\n' > /evidence/stage.txt
timeout 120 ../source/configure "${args[@]}" > /evidence/configure.log 2>&1
if grep -q 'WARNING:' /evidence/configure.log; then echo 'CONFIGURE_WARNING_REJECTED'; exit 1; fi
printf 'CONFIGURATION_GUARDS\n' > /evidence/stage.txt
cp config.h config_components.h /evidence/
cp ffbuild/config.mak /evidence/config.mak
# Reject the concrete external linkage previously observed in the broad binary.
if grep -Eq '^#define CONFIG_(GPL|NONFREE|VERSION3|NETWORK|CHROMAPRINT|LIBOPENH264|LIBX264|LIBX265|LIBFFTW3|VAAPI|VDPAU|VULKAN) 1$' config.h config_components.h; then echo 'FORBIDDEN_CONFIG'; exit 1; fi
for component in H264_DECODER AAC_DECODER MJPEG_DECODER MJPEG_ENCODER WRAPPED_AVFRAME_ENCODER PCM_S16LE_ENCODER MOV_DEMUXER JPEG_PIPE_DEMUXER MP4_MUXER IMAGE2_MUXER NULL_MUXER FILTER_UNITS_BSF H264_METADATA_BSF; do
 grep -qx "#define CONFIG_${component} 1" config_components.h
done
grep -qx '#define CONFIG_CBS_H264 1' config.h
printf 'COMPILE\n' > /evidence/stage.txt
timeout 900 make -j2 ffmpeg ffprobe > /evidence/build.log 2>&1
printf 'INSPECT\n' > /evidence/stage.txt
cp ffmpeg ffprobe /build/
for tool in ffmpeg ffprobe; do
 sha256sum "/build/$tool" > "/evidence/$tool.sha256"
 readelf --dynamic "/build/$tool" > "/evidence/$tool.dynamic.txt"
 readelf --version-info "/build/$tool" > "/evidence/$tool.versions.txt"
 "/build/$tool" -version > "/evidence/$tool.version.txt"
 "/build/$tool" -protocols > "/evidence/$tool.protocols.txt" 2>&1
done
/build/ffmpeg -hide_banner -decoders > /evidence/decoders.txt 2>&1
/build/ffmpeg -hide_banner -encoders > /evidence/encoders.txt 2>&1
/build/ffmpeg -hide_banner -filters > /evidence/filters.txt 2>&1
/build/ffmpeg -hide_banner -bsfs > /evidence/bsfs.txt 2>&1
cp ../source/LICENSE.md ../source/COPYING.* /evidence/
# No executable or archive is published. Full exact source stays in this owned CI build.
echo 'MINIMAL_BUILD=COMPLETED_EXPERIMENT_ONLY'