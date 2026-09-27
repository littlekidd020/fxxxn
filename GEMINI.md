# Repository Guidelines & Automation

## Git & Deployment Rules
- **Automatic Remote Sync**: Whenever local changes are made and verified, commit them and automatically push them to the remote `main` branch (`origin/main`).
- **Sync Main Repository**: Ensure the main working copy at `C:/web/fxxxn` is fast-forwarded and kept in sync with `origin/main`.
- **Git Hook**: The repository is equipped with a `post-commit` hook (`.git/hooks/post-commit`) that automatically pushes commits to `origin` and syncs them to `main`.
