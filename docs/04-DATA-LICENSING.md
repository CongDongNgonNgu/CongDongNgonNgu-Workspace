# Open Data, Provenance & Licensing

No external language dataset may be imported until its current license, attribution, redistribution constraints and provenance requirements are understood and represented in the data model.

Minimum provenance fields, adapted by resource type: `sourceType`, `sourceId`, `sourceUrl`, `licenseId/licenseRef`, `attribution`, `originalAuthor/contributor`, `importBatch`, `reviewStatus`, `qualityScore`, timestamps and transformation history.

Baseline review lifecycle: `draft → community_review → verified` or `rejected`. Phase 08 may add `imported_unreviewed` if useful.

For Tatoeba, Phase 08 must re-confirm current licensing/attribution requirements before implementing an adapter; preserve source sentence IDs and relationships; deduplicate without losing attribution.

Community contribution UI/terms must make reuse/licensing expectations clear before submission. Do not silently turn private messages into public library material.

Common Voice/speech datasets remain V2 research unless legal and technical requirements are verified. Do not mirror/redistribute contrary to provider terms. User voice is not retained by default without explicit consent and retention policy.

AI-generated content remains source-aware and cannot become canonical `verified` material solely because a model produced it; durable canonical resources require human/community review.
