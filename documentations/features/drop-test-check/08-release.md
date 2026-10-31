# Release report: drop-test-check

**Gate 1 (local, before push): READY_FOR_PR** · 2026-10-31 · pack-release 0.1.0

Branch `chore/drop-test-check` → `main` · release head `02f858b` · reviewed code `02f858b` (round 1)

Gate 1 does not know CI. Merge readiness is decided after the PR by gate 2, and the merge is Rafi's.

## Checks

| check | result |
|---|---|
| R1 branch | ok: on chore/drop-test-check |
| R2 clean tree | ok: clean |
| R3 review round | ok: round 1 (documentations/features/drop-test-check/review/round-1) |
| R4 review is for this code | ok: CURRENT (02f858b) |
| R5 review verdict | ok: review verdict WARN |
| R7 sanity at this code | ok: PASS at 02f858b |
| R8 base is current | ok: contains origin/main f1e583a (as of the last fetch) |
| A1 dependency audit | ok: PASS |
| RR release-readiness report | ok: 3 findings (P0 0, P1 3, P2 0); agent verdict NEEDS_CONFIRMATION (not used) |

## Release-readiness findings

| id | level | check | location | evidence | fix |
|---|---|---|---|---|---|
| RR-1 | P1 | Configuration | .github/workflows/pack-ci.yml:26-27 | PACK_REQUIRED changed from "build typecheck test audit secrets" to "build typecheck audit secrets"; PACK_NOT_APPLICABLE gained "test=dropped". The file header says this change reports CI_POLICY_CHANGED and a green ci-gate is not enough to merge. The review handoff for this was UNOWNED. | Rafi confirms explicitly that removing test from the required checks is intended. Record the reason in 01-fix-brief.md or the PR description. |
| RR-2 | P1 | Rollback plan matches what was built | .github/workflows/pack-ci.yml:37 | The matrix still contains test (line 37), and line 70 still runs 'npm test' because package.json has a test script. ci-gate fails when any needed job's result is not 'success' (line 163), so a failing test still blocks the merge. The change does not drop the check from gating, which is what the brief says. Same as open review finding R1-1. | Make the change match the intent. To stop running or gating the test, remove it from the matrix and make ci-gate ignore its job result. To keep gating it, revert the change. Update the brief to say which of the two is meant. |
| RR-3 | P1 | Configuration | .github/workflows/pack-ci.yml:27 | "test=dropped" is added to PACK_NOT_APPLICABLE even though the repo has a test script and test/money.test.ts. If the test script is later removed, test would pass as NOT_APPLICABLE ('dropped') instead of failing as MISSING_REQUIRED. The repo has money code (src/money.ts, src/statement.ts). | Do not list test as NOT_APPLICABLE while tests exist. Keep test required, or give a specific, accurate reason if it is really being retired. |

## Rollback per component

| component | how | check | n/a reason |
|---|---|---|---|
| Application code |  |  | No application source changed in this range; only the CI workflow file changed. |
| Database schema |  |  | No schema or migration change in this range. |
| Data migration / backfill |  |  | No data migration or backfill in this range. |
| External API / contract |  |  | No external API or contract change. The required-status-check contract is the ci-gate job, whose name did not change. |
| Background jobs |  |  | No background jobs added or changed. Only GitHub Actions workflow env values changed. |
| Configuration | Revert commit 02f858b (git revert), which restores PACK_REQUIRED to include test and removes test=dropped from PACK_NOT_APPLICABLE. | After the revert, the pack-ci run's ci-gate summary lists test among the required checks, and ci-gate reports PASS only when test reports PASS. |  |

## Decisions (user-reported, not independently verified)

| id | item | decision | reason |
|---|---|---|---|
| R1-H1 | spec-compliance-reviewer → release-readiness-reviewer at .github/workflows/pack-ci.yml:8-9: File change alters CI policy; /release-check will report CI_POLICY_CHANGED and a green ci-gate is not enough to merge | accepted-risk | fixture test |
| R1-H2 | spec-compliance-reviewer → code-reviewer at .github/workflows/pack-ci.yml:27: PACK_NOT_APPLICABLE reason 'test=dropped' is vague and inaccurate: the repo has a test script and test/money.test.ts, so the entry is never used | accepted-risk | fixture test |
| R1-H3 | code-reviewer → spec-compliance-reviewer at documentations/features/drop-test-check/01-fix-brief.md:3: Intent of 'drop from required checks' (stop running vs. run but not gate) is unspecified in the brief | accepted-risk | fixture test |
| R1-H4 | silent-failure-hunter → spec-compliance-reviewer at .github/workflows/pack-ci.yml:25-27: Brief says drop the test check, but the test job still runs and its failure still fails ci-gate via needs.check.result; the NOT_APPLICABLE entry only applies if the test script is removed. Confirm this matches the intent of the brief. | accepted-risk | fixture test |
| REL-RR-1 | Configuration at .github/workflows/pack-ci.yml:26-27 | accepted-risk | fixture test |
| REL-RR-2 | Rollback plan matches what was built at .github/workflows/pack-ci.yml:37 | accepted-risk | fixture test |
| REL-RR-3 | Configuration at .github/workflows/pack-ci.yml:27 | accepted-risk | fixture test |
| REL-UV-1 | 06-plan.md Git &amp; rollback plan: There is no 06-plan.md in this feature folder (it is a fix brief). I compared the rollback against the diff instead. | accepted-risk | fixture test |
| REL-UV-2 | feature.json risk flags: There is no feature.json in the folder. The review round and the brief both say flags are none. | accepted-risk | fixture test |
| REL-UV-3 | Branch protection settings on GitHub: I could not check whether ci-gate is the only required status check on main. That needs a GitHub settings lookup, which I'm not allowed to do. | accepted-risk | fixture test |

_Decisions are user-reported through the main session and not independently verified (until Phase 6)._

Dependency audit: PASS

