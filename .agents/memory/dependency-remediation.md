---
name: Dependency remediation choices
description: Security rationale for the glob library used by mockup discovery.
---

Prefer a glob library without the micromatch/braces dependency chain for mockup discovery.

**Why:** During the October 2026 security remediation, the latest fast-glob and micromatch still required braces, whose latest release had an unresolved stack-exhaustion vulnerability. Replacing the glob library removed that exposure without changing the preview discovery contract.

**How to apply:** Do not restore that dependency chain unless a patched braces release is available and verified. Preserve recursive TSX discovery and exclusion of underscore-prefixed files and directories when changing glob implementations.
