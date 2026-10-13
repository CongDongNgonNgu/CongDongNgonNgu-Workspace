#003 search/filter design review

Stitch project10625997709031324983. Desktop screenbcd3b008c8ac4b408dfeedc9861b8798 screenshotartifact0fd67c6bb6b64ebc93228c1168e60bb0; mobile screenb3a3852bd3a944c688db1ae381aa07ab screenshotartifact7f645485c38d423a933b81ab28fb634a. Both images downloaded and visually reviewed before visual implementation; root local images outside repositories.

Retain explicit labeled search, compact native More filters disclosure, desktop wrapping grid and mobile single column, apply/reset, selected-filter summary and load-more. Reuse existing components/tokens/navigation. Reject generated desktop invented post taxonomy, badges/levels/reputation/answer counts, unsupported search-syntax promises, saved quick filters and leaderboard/navigation changes. Native post-type enum remains exactly the eight persisted types. Mobile concept used the requested types; selected locale renders its own copy rather than simultaneous bilingual noise.

Concept review is not native responsive/accessibility proof. Server correctness, actual seven-width VI/EN behavior, loading/error/empty/reset, keyboard and query-cost gates remain pending.
