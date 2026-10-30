# Minimal FFmpeg feasibility experiment

Scope: Phase30-002, isolated Workspace CI only. Never an application deployment or format activation. Current application main automatically deploys Production; future application changes target reviewed TEST dev branches. Preserve existing legitimate main/dev history.

Reviewed candidate: FFmpeg commit 6dfaba896fddaea098abec8ac84ff67375a7c6f1, codeload source 17330151 bytes SHA256 cd6175d64b7f152469d48ceffa0dcb3bf36bb3bcae42aece46570d48563cdb85; configure SHA256 5b281b249ad5ad859030b4da0a24ec105b5abff7b3d87a65b302df8bf5fd9833. Existing immutable node builder digest is reused from the approved Phase30 feasibility workflow. Its compiler/OS/libc must be observed, not inferred as Render-compatible.

The standalone CLI worker only needs internal H264/AAC/MJPEG decoding, MP4 stream copy, SEI removal, JPEG thumbnailing and null-output full decoding. Explicit wrapped_avframe/pcm_s16le encoders are required for null output. h264_metadata selects the otherwise missing internal H264 CBS implementation. Buffer/source/sink filters are appended by FFmpeg's build system and must not be passed as unknown configure filter options. MOV and ffmpeg auto-select more internal helpers/filters; generated inventory must be reviewed honestly.

No external codec libraries, network, hardware configuration or GPL/nonfree enablement is intended. That intent is not licensing clearance. Preserve exact full source, notices, build/configuration material and resulting binary provenance before any future packaging. The disposable CI uploads bounded text evidence only; no executable or source archive is published by this experiment.

Two tiny deterministic synthetic fixtures come from Backend505750bed22d7f93defc896a3209bc435ac6cf5a. Their hashes are independently checked before use. No external encoder or real-user media is used. Basic commands run under one overall15s deadline and a192MiB container; these tiny samples do not establish complete worker RSS, adversarial validation, termination, API headroom, Render feasibility, source/license closure, private provider round-trip or cross-domain authorization. Those gates remain NOT_RUN.

Sequence: first CI proves archive-guard tests fail while its implementation is absent; next increment implements the guard and runs those tests before any source build. Local bash/node syntax and fixture hashes were checked. Python/Docker/Linux are unavailable locally, so no local Python/native PASS is claimed. No merge while checks fail. Independent review approves experimental scope only.

Prior owner credential warning remains historical. Owner explicitly instructed continuing after explanation; this experiment uses no credentials and changes none. Rotation is not claimed completed. All attachment flags and Phase30-003..006 remain unchanged/not started; no Phase31.

Sources: https://github.com/FFmpeg/FFmpeg/tree/6dfaba896fddaea098abec8ac84ff67375a7c6f1 ; exact configure, libavcodec/cbs.c, libavcodec/Makefile, libavformat/nullenc.c, libavfilter/allfilters.c, LICENSE.md. See existing Phase30 NATIVE-GATES-002-20261026.md for the broad binary's unresolved transitive source/notice gate.
These initial fixtures contain no injected private title/SEI. Metadata/SEI sanitization security, corrupt-input rejection, timeout/cancel behavior, strict complete component allowlisting and ABI clearance are explicitly NOT_RUN by this initial probe.
