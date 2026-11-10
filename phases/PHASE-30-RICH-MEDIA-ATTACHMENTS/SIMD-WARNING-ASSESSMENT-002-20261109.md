# SIMD compiler warning assessment - 2026-11-09

Scope: bounded source/reachability assessment of49 emitted warning lines, not memory-safety or decoder-security clearance. This note records the independent trace review scope supplied by the coordinator and a direct factual comparison of retained logs.

Current build.log from CI42555671199 contains49 warning lines,46 distinct complete warning lines and44 distinct source sites. The sorted49 complete lines exactly match the historical classic CI41010699901 build.log. Historical ZIP249407bytes/SHA25656fc205bf57afbad46ae1fe020b85430dd38665c38b32a48771db2f1f0e0bb57; its bounded, CRC-verified build.log is25504bytes/SHA25679931a2ffd86cd26eb50624327300a13af83188a42db524ba3e9060935fa2b56. ZIP entry was read in memory without filesystem extraction or native execution. Matching old warnings establishes provenance, not harmlessness.

| Emitted lines | Source sites | Trace category and remaining scope |
| --- | --- | --- |
| 38 | 38 | Unused functions:36 image probes, img2enc write_packet_pipe and pcm_decode_frame. Unused diagnostics do not establish absence of reachable malformed-input behavior elsewhere. |
| 4 | 1 | aacsbr_template.c:732, repeated stringop-overflow diagnostic. Deeper SBR/CRC/PS/grid validation and decoder behavior remain HOLD. |
| 2 | 2 | h264dec.c:951/952, FF_PTR_ADD expansion in boolean context. Malformed H264 field and pointer-state behavior remain HOLD. |
| 2 | 2 | mpegvideo_enc.c:2887/2888, pred_x/pred_y uninitialized diagnostics. H263/mb_info reachability remains HOLD; shared-source compilation is not proof that the implicated path is reachable or unreachable for the frozen codec set. |
| 3 | 1 | vlc.c:443, array indices3/4/5 against uint16_t[3]. Multi-VLC call/table reachability and malformed-table behavior remain HOLD. |

The source/trace review does not change the pinned upstream sources or suppress warnings. Conservative source coverage retains complete original archives/notices and all48 compiled assembly targets;19 C/x86 archive-basename collisions still prevent exact selected-object claims. Deep decoder negatives, linked-path analysis, actual resource containment and deployed acceptance remain separate gates. No blanket license/security PASS, format enablement or Phase30-002 DONE follows.
