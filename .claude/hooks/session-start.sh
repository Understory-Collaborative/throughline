#!/bin/bash
# SessionStart hook for Throughline.
# Installs app dependencies so npm run dev / build / lint work in web sessions.
# Idempotent and non-interactive. npm install is a no-op when already current.
set -euo pipefail

# Only needed in the remote (Claude Code on the web) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR/app"
npm install --no-fund --no-audit
