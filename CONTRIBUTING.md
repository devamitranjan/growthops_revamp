# Contributing

## Branching

`main` is deployed. Nothing is committed to it directly — every change arrives
as a pull request from a branch named `feat/…`, `fix/…`, `chore/…` or `docs/…`.

## Commits

Conventional Commits, enforced by commitlint on `commit-msg`. Run `pnpm commit`
for a guided prompt instead of writing the prefix by hand.

## Before you open a PR

```bash
pnpm lint
pnpm typecheck
pnpm build
```

CI runs the same three. Running them locally is faster than waiting for a red
check.

## What has to pass before a PR merges

These are enforced by branch protection on `main` and `develop`, not by
convention:

| Gate | Enforced by |
| --- | --- |
| Lint, typecheck and build pass | `CI / Lint, typecheck, build` |
| No secret anywhere in the branch's history | `Security / Secret scan` (gitleaks) |
| No high or critical advisory in production deps | `Security / Dependency audit` |
| No new CodeQL security finding | `Security / CodeQL` |
| One approving review before merge | Branch protection (required approvals) |
| Approval is not stale | Dismiss stale approvals on new commits |
| Branch is current with the base | Require branches to be up to date |
| Security checklist is complete | PR template, checked by the reviewer |
| Linear history | Squash merge only |

One job is deliberately *not* in that list. `Security / Vulnerability scan`
(Trivy) reports to the repository's Security tab instead of failing the build:
it reads the same lockfile as the audit gate but files findings as tracked,
dismissible alerts that outlive the run. Findings there are triaged, not
merge-blocking — `pnpm audit` is what stops a merge. Check the Security tab
when Dependabot opens a PR, not only when CI is red.

## Branch protection settings

The workflows in `.github/workflows/` only *report* status. They block nothing
until the repository is configured to require them. In
**Settings → Branches → Add rule** for `main` (then repeat for `develop`):

- Require a pull request before merging
  - Required approvals: **1**
  - Dismiss stale pull request approvals when new commits are pushed: **on**
- Require status checks to pass before merging: **on**
  - Require branches to be up to date before merging: **on**
  - Required checks: `Lint, typecheck, build`, `Secret scan`,
    `Dependency audit`, `CodeQL`
  - Do **not** add `Vulnerability scan` here — it reports, it does not gate
- Require conversation resolution before merging: **on**
- Require linear history: **on**
- Do not allow bypassing the above settings: **on** — including administrators.
  A rule the repo owner can click past is a rule that gets clicked past.
- Allow force pushes: **off**. Allow deletions: **off**

Then in **Settings → General → Pull Requests**, leave only **Allow squash
merging** enabled, and turn on **Automatically delete head branches**.

Finally, in **Settings → Code security**, enable secret scanning, push
protection, and Dependabot alerts and security updates.

Push protection is the one that matters most day to day: it rejects a push
containing a recognised token *before* it reaches GitHub, so the secret never
needs rotating.

## The local hooks are a convenience, not a gate

`pre-commit` runs `lint-staged`, `pre-push` runs `typecheck`. Both are skipped
by `--no-verify`, and neither runs on someone else's machine. CI is the gate;
the hooks just save you a round trip.
