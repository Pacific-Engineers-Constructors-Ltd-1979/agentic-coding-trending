# Project Guidance

- Write reader-facing content in English first, then include a complete Traditional Chinese version after the English original.
- Keep both language versions factually consistent; update their dates, evidence, and corrections together.
- Support research claims with verifiable sources, and distinguish confirmed facts from analysis and speculation.
- Link weekly notes to the daily notes they synthesize. If evidence is insufficient, say so explicitly rather than speculating.
- Prefer `pnpm` as the package manager (`pnpm install`, `pnpm build`, `pnpm dev`); do not create `package-lock.json` or `yarn.lock`.
- In every note, keep the Summary paragraph (`## Summary` in daily notes, `## Week in review` in weekly notes) as the first paragraph of the English section; list pages on the site show it as an excerpt.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues for this repo, using the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-label vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
