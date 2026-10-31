# Release report: fee-cap

**Gate 1 (local, before push): PENDING_HUMAN_DECISION** · 2026-10-31 · pack-release 0.1.0

Branch `fix/fee-cap` → `main` · release head `549a0a1` · reviewed code `549a0a1` (round 3)

Gate 1 does not know CI. Merge readiness is decided after the PR by gate 2, and the merge is Rafi's.

## ⚠ Open items that need Rafi's decision

| id | kind | item |
|---|---|---|
| NI-1 | reviewer not installed | typescript-reviewer: TypeScript files changed |

## Checks

| check | result |
|---|---|
| R1 branch | ok: on fix/fee-cap |
| R2 clean tree | ok: clean |
| R3 review round | ok: round 3 (documentations/features/fee-cap/review/round-3) |
| R4 review is for this code | ok: CURRENT (549a0a1) |
| R5 review verdict | ok: review verdict APPROVE |
| R7 sanity at this code | ok: PASS at 549a0a1 |
| R8 base is current | ok: contains origin/main f1e583a (as of the last fetch) |
| A1 dependency audit | ok: PASS |
| RR release-readiness report | ok: 3 findings (P0 0, P1 1, P2 2); agent verdict NEEDS_CONFIRMATION (not used) |

## Release-readiness findings

| id | level | check | location | evidence | fix |
|---|---|---|---|---|---|
| RR-1 | P1 | Configuration | src/fee-cap.ts:15-18 | New env var read in code: envValue('FEE_CAP_AGOROT'), default DEFAULT_CAP_AGOROT = 5000 when unset. The repo has no .env.example and the README does not mention FEE_CAP_AGOROT (git grep finds it only in src and test). | Document FEE_CAP_AGOROT (unit: agorot, digits only, default 5000, malformed value throws) in the README or a new .env.example, and tell the deployer to set it explicitly if 5000 is not the intended production cap. |
| RR-2 | P2 | Rollback plan matches what was built | src/fee-cap.ts:21 | capFee and readCap are exported but not called from any non-test file (git grep over the tree). The brief says 'Actual: no cap is applied'; merging this range alone leaves production fee behaviour unchanged. | State in the release notes that the cap is not active until a charge path calls capFee, or include the wiring in a follow-up release with its own rollback entry. |
| RR-3 | P2 | Observability | src/fee-cap.ts:21 | The default parameter `cap: number = readCap()` reads and validates the env on every call. Once wired in, a malformed FEE_CAP_AGOROT will throw inside the fee path with no log, metric or startup check. If process.env is unreachable, envValue returns undefined and the 5000 default is used silently (R3-1 in 07-review.md). | When wiring in, call readCap() once at startup so a bad value fails the deploy, and log or alert on errors from the fee path. |

## Rollback per component

| component | how | check | n/a reason |
|---|---|---|---|
| Application code | Revert the three commits (db674ef, 4651052, 549a0a1) or redeploy the previous build. No other code imports the new module, so removing it has no side effects. | Build, typecheck and npm test pass at the base SHA. src/fee-cap.ts is absent from the deployed artifact. |  |
| Database schema |  |  | No schema or migration files in this range (only src/fee-cap.ts and test/fee-cap.test.ts changed). |
| Data migration / backfill |  |  | No backfill or data rewrite in this range. capFee is a pure function and persists nothing. |
| External API / contract |  |  | No external calls and no API or route changes in this range. |
| Background jobs |  |  | No jobs added or changed in this range. |
| Configuration | Unset FEE_CAP_AGOROT to return to the code default of 5000. Reverting the code makes the variable unused. No existing config key is changed. | Confirm the deployed environment either lacks FEE_CAP_AGOROT or holds digits only. Once capFee is wired in, a fee calculation with the default or a valid value returns without a RangeError or config Error. |  |

## Decisions (user-reported, not independently verified)

| id | item | decision | reason |
|---|---|---|---|
| R3-H1 | spec-compliance-reviewer → code-reviewer at src/fee-cap.ts:18: readCap accepts arbitrarily long digit strings; a value like 99999999999999999999 becomes 1e20 (not a safe integer), a precision/upper-bound question outside spec lane | accepted-risk | fixture test |
| R3-H2 | pr-test-analyzer → code-reviewer at src/fee-cap.ts:18: readCap accepts digit strings above Number.MAX_SAFE_INTEGER (e.g. 99999999999999999999 becomes 1e20) and Number.isInteger still passes, so precision is lost silently | accepted-risk | fixture test |
| REL-RR-1 | Configuration at src/fee-cap.ts:15-18 | accepted-risk | fixture test |
| REL-UV-1 | Rollback plan (06-plan.md 'Git &amp; rollback plan'): 06-plan.md and 03-spec.md do not exist for this fix-size feature, so the plan could not be compared to the commits. The rollback table above is derived from the diff. | accepted-risk | fixture test |
| REL-UV-2 | Lint, e2e and smoke checks: sanity.json reports them as 'not configured'. They did not run, so no result is available. | accepted-risk | fixture test |
| REL-UV-3 | Production value of FEE_CAP_AGOROT: Deployed configuration is not visible from the repository. | accepted-risk | fixture test |

_Decisions are user-reported through the main session and not independently verified (until Phase 6)._

Dependency audit: PASS

