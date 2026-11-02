#!/usr/bin/env bash
set -euo pipefail
# Runner-local relink diagnostics. Original executables are read-only mounts.
cd /build/objects
[[ $(pwd -P) == /build/objects ]]
for file in ffmpeg ffmpeg_g ffprobe ffprobe_g; do
 [[ -f "$file" && ! -L "$file" && $(stat -c %u "$file") == "$(id -u)" ]]
done
printf '%s  %s\n' \
 '2af1963c499a3005ad4d6037794b9e4bc383c7a1c0f545267297195d68f9ccee' /original/ffmpeg \
 '64c3340d0325afa37fff5015bfacf162095103dc2cbd319d799d70cc9633d24e' /original/ffprobe | sha256sum --check --strict
printf '%s  %s\n' \
 '9d6b43ce4d8de0c878bf16b54d8e7a10d9bd42b75178153e3af6a815bdc90f74' /experiment/notices/gcc/COPYING.RUNTIME \
 '8ceb4b9ee5adedde47b31e975c1d90c73ad27b6b165a1dcd80c7c545eb65b903' /experiment/notices/gcc/COPYING3 | sha256sum --check --strict
# No globs, recursive removal or source changes: only these four owned build outputs.
rm -- ffmpeg ffmpeg_g ffprobe ffprobe_g
export TMPDIR=/tmp
for tool in ffmpeg ffprobe; do
 (
  # Bash default units are1024bytes (POSIX mode512); either ceiling is <=16MiB.
  ulimit -f 16384
  timeout --kill-after=5s 60 make V=1 "LD=gcc -Wl,-t,-Map=/evidence/$tool.link-map.txt" "$tool" > "/evidence/$tool.link-trace.txt" 2>&1
 )
 for kind in link-map link-trace; do
  file="/evidence/$tool.$kind.txt"
  [[ -f "$file" && ! -L "$file" && $(stat -c %s "$file") -gt 0 && $(stat -c %s "$file") -le 16777216 ]]
 done
 # Any accidental source recompilation is outside this relink-only experiment.
 if grep -Eq '(^|[[:space:]])-c([[:space:]]|$)' "/evidence/$tool.link-trace.txt"; then echo RELINK_RECOMPILED_SOURCE; exit 1; fi
 cmp --silent "/original/$tool" "$tool"
done
sha256sum /original/ffmpeg ffmpeg /original/ffprobe ffprobe > /evidence/relink-binaries.sha256
# Record observed considered absolute system/compiler linker inputs; never copy library/object bytes.
awk '$1=="LOAD" && $2 ~ /^\// && $2 !~ /^\/build\// {print $2}' /evidence/ffmpeg.link-map.txt /evidence/ffprobe.link-map.txt | sort -u > /evidence/runtime-input-paths.txt
[[ -s /evidence/runtime-input-paths.txt && $(wc -l < /evidence/runtime-input-paths.txt) -le 64 ]]
: > /evidence/runtime-inputs.tsv
while IFS= read -r file; do
 [[ "$file" == /usr/* || "$file" == /lib/* || "$file" == /lib64/* ]]
 resolved=$(readlink -f -- "$file")
 [[ "$resolved" == /usr/* || "$resolved" == /lib/* || "$resolved" == /lib64/* ]]
 [[ -f "$resolved" && ! -L "$resolved" ]]
 bytes=$(stat -c %s "$resolved")
 [[ "$bytes" -gt 0 && "$bytes" -le 20000000 ]]
 hash=$(sha256sum -- "$resolved"); hash=${hash%% *}
 printf '%s\t%s\t%s\t%s\n' "$file" "$resolved" "$bytes" "$hash" >> /evidence/runtime-inputs.tsv
done < /evidence/runtime-input-paths.txt
{
 gcc -dumpfullversion
 gcc -print-libgcc-file-name
 gcc -print-file-name=crtbegin.o
 gcc -print-file-name=crtend.o
} > /evidence/gcc-runtime-locations.txt
dpkg-query -W '-f=${binary:Package}\t${Version}\t${source:Package}\t${source:Version}\n' libc6 libc6-dev > /evidence/system-package-versions.txt
cp /usr/share/doc/libc6/copyright /evidence/system-libc-copyright.txt
for file in runtime-inputs.tsv runtime-input-paths.txt gcc-runtime-locations.txt system-package-versions.txt system-libc-copyright.txt relink-binaries.sha256; do
 [[ -f "/evidence/$file" && ! -L "/evidence/$file" && $(stat -c %s "/evidence/$file") -gt 0 && $(stat -c %s "/evidence/$file") -le 131072 ]]
done
echo RELINK_IDENTICAL_WITH_OBSERVED_INPUT_PROVENANCE
