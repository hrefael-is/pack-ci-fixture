# Release report: drop-test-check-r2

**Gate 1 (local, before push): READY_FOR_PR** · 2026-10-31 · pack-release 0.1.0

Branch `chore/drop-test-check-r2` → `main` · release head `0210c5c` · reviewed code `0210c5c` (round 2)

Gate 1 does not know CI. Merge readiness is decided after the PR by gate 2, and the merge is Rafi's.

## Checks

| check | result |
|---|---|
| R1 branch | ok: on chore/drop-test-check-r2 |
| R2 clean tree | ok: clean |
| R3 review round | ok: round 2 (documentations/features/drop-test-check-r2/review/round-2) |
| R4 review is for this code | ok: CURRENT (0210c5c) |
| R5 review verdict | ok: review verdict APPROVE |
| R7 sanity at this code | ok: PASS at 0210c5c |
| R8 base is current | ok: contains origin/main f1e583a (as of the last fetch) |
| A1 dependency audit | ok: PASS |
| RR release-readiness report | ok: 2 findings (P0 0, P1 1, P2 1); agent verdict NEEDS_CONFIRMATION (not used) |

## Release-readiness findings

| id | level | check | location | evidence | fix |
|---|---|---|---|---|---|
| RR-1 | P1 | Configuration | .github/workflows/pack-ci.yml:26-27 | PACK_REQUIRED changed from "build typecheck test audit secrets" to "build typecheck audit secrets"; PACK_NOT_APPLICABLE gained "test=dropped". This is a production CI policy change (the file header says it triggers CI_POLICY_CHANGED). Because test is no longer required, a project with no real test script now reports NOT_APPLICABLE and passes (lines 74-81) instead of MISSING_REQUIRED, so removing the test script would no longer be caught by ci-gate. | Rafi to confirm the policy change on purpose (gate 2 should report CI_POLICY_CHANGED naming test). If the intent is only to relax the requirement, keep test required or record the real reason for dropping it. |
| RR-2 | P2 | Configuration | .github/workflows/pack-ci.yml:27 | The not-applicable reason is just "test=dropped". The header says each entry carries its reason, and the other entries do ("no linter configured in this fixture"). The test job still runs and still blocks the gate through needs.check (line 163) when a test script exists, so the label "not applicable" does not match behaviour. Round 2 handoffs to code-reviewer and spec-compliance-reviewer already note this and are unconfirmed. | Replace "dropped" with a real reason, or state in the brief that a failing test job is meant to keep blocking merge. |

## Rollback per component

| component | how | check | n/a reason |
|---|---|---|---|
| Application code |  |  | No application code changed in this range; only .github/workflows/pack-ci.yml changed. |
| Database schema |  |  | No schema or migration change in this range. |
| Data migration / backfill |  |  | No data migration or backfill in this range. |
| External API / contract |  |  | No external API or contract change. The only external-facing item is the GitHub required-status-check name, and that is unchanged (ci-gate). |
| Background jobs |  |  | No background job added or changed in this range. |
| Configuration | Revert commit 0210c5c (git revert) to restore PACK_REQUIRED with test and remove test=dropped from PACK_NOT_APPLICABLE, through a new PR. | After the revert PR, the workflow shows PACK_REQUIRED containing test, the ci-gate step summary lists a 'test' row in the required-check table, and gate 2 reports CI_POLICY_CHANGED for the revert. |  |

## Decisions (user-reported, not independently verified)

| id | item | decision | reason |
|---|---|---|---|
| R2-H1 | spec-compliance-reviewer → code-reviewer at .github/workflows/pack-ci.yml:163: ci-gate still fails when any check matrix leg fails, so a failing test job continues to block merge even though test is no longer in PACK_REQUIRED; matches the brief's wording but may differ from the user's intent | accepted-risk | fixture test |
| R2-H2 | spec-compliance-reviewer → code-reviewer at .github/workflows/pack-ci.yml:27: PACK_NOT_APPLICABLE entry 'test=dropped' gives no real reason, unlike the other entries | accepted-risk | fixture test |
| R2-H3 | silent-failure-hunter → spec-compliance-reviewer at .github/workflows/pack-ci.yml:27: Reason string 'test=dropped' gives no rationale and labels a check NOT_APPLICABLE although the test job still runs and blocks via needs.check when the project has a test script; wording/intent note, not a silent failure | accepted-risk | fixture test |
| REL-RR-1 | Configuration at .github/workflows/pack-ci.yml:26-27 | accepted-risk | fixture test |
| REL-UV-1 | Rollback plan against 06-plan.md: No 06-plan.md exists in documentations/features/drop-test-check-r2/, so the 'Git &amp; rollback plan' could not be compared with the change. | accepted-risk | fixture test |
| REL-UV-2 | PR CI run still showing the test job: The brief requires this after the PR is opened; it needs a GitHub run, which I do not run. I could only confirm from the workflow that test stays in the matrix (line 37). | accepted-risk | fixture test |

_Decisions are user-reported through the main session and not independently verified (until Phase 6)._

Dependency audit: PASS

