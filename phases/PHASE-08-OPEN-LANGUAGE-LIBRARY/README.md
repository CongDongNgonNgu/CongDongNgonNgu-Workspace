# Phase 08 — Open Language Library

## Goal
Build the provenance-aware knowledge layer that turns community/open resources into reusable language-learning assets without losing source, license, review or quality information.

## Resource families
Vocabulary, Sentence, Translation, GrammarItem, Dialogue, Idiom, Slang, CulturalNote, Pronunciation and LearningCollection. Implement common infrastructure first; do not force every type into one lossy table if domain needs differ.

## Non-negotiable rule
No external dataset ingestion before licensing/provenance architecture and current source terms are confirmed.

## Completion gate
Resource model/provenance/review workflow, search/filter, community contribution and first approved import adapter (Tatoeba only if licensing validation passes) are implemented; UI Stitch and tests cover attribution/review states; commits/CI/evidence complete.
