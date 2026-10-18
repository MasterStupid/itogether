---
name: GitHub authentication
description: Distinguishing an integration connection from working workspace Git authentication.
---
Do not assume a healthy GitHub integration means workspace Git or gh can authenticate.

**Why:** the integration reported healthy and automatic CLI authentication, but gh had no authentication and GitHub rejected a push. The reconnect card also could not reconnect this source-control connection.

**How to apply:** verify access with the actual Git operation. If authentication fails despite a healthy integration, direct the user to reconnect GitHub in Git provider settings or the Git pane, not merely the general integration. Never request a token in chat or claim a push succeeded without verifying it.
