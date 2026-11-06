#!/usr/bin/env bash
set -euo pipefail
# RESEARCH ONLY: fixed pinned source inputs, no delivery or application mutation.
cd /build
printf 'NASM_EXTRACT\n' > /evidence/stage.txt
mkdir nasm-source
timeout 10 tar --extract --gzip --file /nasm-source.tar.gz --directory nasm-source --strip-components=1 --no-same-owner --no-same-permissions
cp nasm-source/LICENSE /evidence/nasm-LICENSE
cd nasm-source
trap 'if test -f config.log; then cp config.log /evidence/nasm-config.log; fi' EXIT
printf 'NASM_CONFIGURE\n' > /evidence/stage.txt
timeout 120 sh ./configure --prefix=/build/nasm-install > /evidence/nasm-configure.log 2>&1
printf 'NASM_BUILD\n' > /evidence/stage.txt
timeout 180 make -j2 nasm > /evidence/nasm-build.log 2>&1
./nasm -v > /evidence/nasm-version.txt
grep -q '^NASM version 2\.16\.03 ' /evidence/nasm-version.txt
sha256sum /build/nasm-source/nasm > /evidence/nasm.sha256
cp config.log /evidence/nasm-config.log
printf 'FFMPEG_CANDIDATE\n' > /evidence/stage.txt
bash /candidate-recipe.sh
printf 'CANDIDATE_INVENTORY\n' > /evidence/stage.txt
for tool in ffmpeg ffprobe; do
 readelf --version-info "/build/$tool" > "/evidence/$tool.versions.txt"
 readelf --program-headers --wide "/build/$tool" > "/evidence/$tool.program-headers.txt"
 # GNU_STACK must exist and have no executable flag.
 awk '/GNU_STACK/ { found++; if ($0 ~ /E/) bad=1 } END { if (found != 1 || bad) exit 1 }' "/evidence/$tool.program-headers.txt"
done
cd /build/objects
find . -type f -name '*.o' -print0 | sort -z | xargs -0 -r sha256sum > /evidence/object-inventory.txt
cd /build/source
find . -type f \( -name '*.asm' -o -name '*.inc' \) -print0 | sort -z | xargs -0 -r sha256sum > /evidence/source-assembly-inventory.txt
printf 'BUILD_COMPLETE_RESEARCH_ONLY\n' > /evidence/stage.txt
