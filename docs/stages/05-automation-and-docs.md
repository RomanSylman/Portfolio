# Stage 05: Automation and documentation

## Goal

Continuous checks on every change, and documentation that records the system and
how it was built.

## What was done

- Added a GitHub Actions workflow that installs dependencies, runs `pnpm check`
  and `pnpm build`, then runs Lighthouse CI against the built site.
- Set Lighthouse thresholds: performance at least 0.85, and accessibility,
  best practices and SEO at least 0.95.
- Wrote the README, the changelog, the architecture and conventions documents,
  the content guide, six architecture decision records and this stage log.

## How to verify

```bash
pnpm check
```

The workflow runs automatically once the repository is pushed to GitHub. Lighthouse
needs a built site, so it runs its own `pnpm build` inside the job.

## Notes

Connecting the repository to GitHub and pushing it is left as a manual step. The
workflow files are ready and take effect on the first push to `main` and on pull
requests.
