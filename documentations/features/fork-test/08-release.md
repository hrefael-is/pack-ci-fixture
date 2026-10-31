# Release report: fork-test

**Gate 1 (local, before push): READY_FOR_PR** · 2026-10-31 · pack-release 0.1.0

Branch `chore/fork-test` → `main` · release head `0e131ec` · reviewed code `0e131ec` (round 2)

Gate 1 does not know CI. Merge readiness is decided after the PR by gate 2, and the merge is Rafi's.

## Checks

| check | result |
|---|---|
| R1 branch | ok: on chore/fork-test |
| R2 clean tree | ok: clean |
| R3 review round | ok: round 2 (documentations/features/fork-test/review/round-2) |
| R4 review is for this code | ok: CURRENT (0e131ec) |
| R5 review verdict | ok: review verdict APPROVE |
| R7 sanity at this code | ok: PASS at 0e131ec |
| R8 base is current | ok: contains origin/main f1e583a (as of the last fetch) |
| A1 dependency audit | ok: PASS |
| RR release-readiness report | ok: 2 findings (P0 0, P1 1, P2 1); agent verdict NEEDS_CONFIRMATION (not used) |

## Release-readiness findings

| id | level | check | location | evidence | fix |
|---|---|---|---|---|---|
| RR-1 | P1 | Configuration | .github/workflows/pack-ci.yml:26-27 | PACK_REQUIRED changed from "build typecheck test audit secrets" to "build typecheck audit secrets"; PACK_NOT_APPLICABLE gained "test=dropped". test still runs in the matrix (line 37, case at line 70) and a failing test still fails ci-gate via needs.check.result, but if the test script is removed or stubbed the check now resolves to NOT_APPLICABLE (line 77-78) instead of MISSING_REQUIRED, so the merge gate silently loses its guarantee that tests exist. This is a CI policy change (CI_POLICY_CHANGED). | Rafi to confirm the CI_POLICY_CHANGED report naming test was produced by Gate 2 and that dropping the guarantee is intended. If tests should still be mandatory, keep test in PACK_REQUIRED. |
| RR-2 | P2 | Configuration | .github/workflows/pack-ci.yml:27 | "test=dropped" is the only PACK_NOT_APPLICABLE entry without a reason; the others say why they do not apply ("no linter configured in this fixture"). | Give a reason for dropping test, or do not list test in PACK_NOT_APPLICABLE if it is meant to keep running as a non-required check. |

## Rollback per component

| component | how | check | n/a reason |
|---|---|---|---|
| Application code |  |  | No application source changed in this range; only the CI workflow file. |
| Database schema |  |  | No schema or migration change in this range. |
| Data migration / backfill |  |  | No data migration or backfill in this range. |
| External API / contract |  |  | No external API or contract change in this range. |
| Background jobs |  |  | No background job change in this range (the GitHub Actions workflow is CI, not a production job). |
| Configuration | git revert the head commit to restore test in PACK_REQUIRED and remove test=dropped from PACK_NOT_APPLICABLE. | After the revert, the ci-gate step summary lists test among the required checks and shows PASS for it. |  |

## Decisions (user-reported, not independently verified)

| id | item | decision | reason |
|---|---|---|---|
| R2-H1 | spec-compliance-reviewer → code-reviewer at .github/workflows/pack-ci.yml:27: The 'test=dropped' reason text is vaguer than the other PACK_NOT_APPLICABLE entries, which say why the check does not apply | accepted-risk | fixture test |
| R2-H2 | spec-compliance-reviewer → security-reviewer at .github/workflows/pack-ci.yml:26: Removing test from the required checks weakens the merge gate; whether that is acceptable is a policy and security question outside the brief | accepted-risk | fixture test |
| R2-H3 | silent-failure-hunter → spec-compliance-reviewer at .github/workflows/pack-ci.yml:26-27: test is removed from PACK_REQUIRED but still runs in the matrix and still gates merge through the job result; confirm this matches the intent to drop the required check | accepted-risk | fixture test |
| R2-H4 | silent-failure-hunter → spec-compliance-reviewer at documentations/features/fork-test/01-fix-brief.md:4: The fix brief requires CI_POLICY_CHANGED naming test from /release-check; that check is not in this diff, so it is unverified here | accepted-risk | fixture test |
| REL-RR-1 | Configuration at .github/workflows/pack-ci.yml:26-27 | accepted-risk | fixture test |
| REL-UV-1 | Rollback plan versus what was built: No 06-plan.md exists in documentations/features/fork-test/ (fix-size change with only 01-fix-brief.md), so there is no Git & rollback plan to compare. | accepted-risk | fixture test |
| REL-UV-2 | CI_POLICY_CHANGED detection by /release-check Gate 2: The detection lives outside this repo and cannot be confirmed from the code or the result files; the brief requires it to name test. | accepted-risk | fixture test |

_Decisions are user-reported through the main session and not independently verified (until Phase 6)._

Dependency audit: PASS

