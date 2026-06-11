#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

git --git-dir="$ROOT_DIR/.git-data" --work-tree="$ROOT_DIR" "$@"
