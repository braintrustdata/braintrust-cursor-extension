# Contributing

The source for this plugin and extension lives in
[braintrust-coding-agent-plugins](https://github.com/braintrustdata/braintrust-coding-agent-plugins)
under `src/plugins/cursor/content/`. The
[braintrust-cursor-extension](https://github.com/braintrustdata/braintrust-cursor-extension)
repository is generated from this directory during a release. Make changes and
open pull requests in the monorepo.

## Development Setup

### Prerequisites

- Node.js 22 or newer (release CI uses Node.js 24)
- npm

### Build from Source

```bash
# Clone the source repository
git clone https://github.com/braintrustdata/braintrust-coding-agent-plugins.git
cd braintrust-coding-agent-plugins/src/plugins/cursor/content

# Install dependencies
npm ci

# Build the extension
npm run build
```

From the monorepo root, run `make validate-cursor` to build and validate the
Cursor distribution tree, including its plugin manifest, MCP configuration,
and tracing hooks.

### Running in Development

1. Open `src/plugins/cursor/content/` in Cursor
2. Press `F5` to launch the Extension Development Host
3. A new Cursor window will open with the extension loaded

### Setting the Environment Variable for Development

The extension reads `BRAINTRUST_API_KEY` from the process environment at runtime. You must set this variable **before** launching Cursor so the extension host process inherits it.

#### macOS / Linux

```bash
# Set the environment variable and launch Cursor
export BRAINTRUST_API_KEY="your-api-key-here"
cursor .

# Or in a single line
BRAINTRUST_API_KEY="your-api-key-here" cursor .
```

For persistent configuration, add to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
export BRAINTRUST_API_KEY="your-api-key-here"
```

Then restart your terminal and Cursor.

#### Windows (PowerShell)

```powershell
# Set for current session
$env:BRAINTRUST_API_KEY = "your-api-key-here"

# Launch Cursor
cursor .
```

For persistent configuration:

```powershell
# Set permanently for user
[Environment]::SetEnvironmentVariable("BRAINTRUST_API_KEY", "your-api-key-here", "User")
```

Then restart PowerShell and Cursor.

#### Windows (Command Prompt)

```cmd
# Set for current session
set BRAINTRUST_API_KEY=your-api-key-here

# Launch Cursor
cursor .
```

For persistent configuration, use System Properties > Environment Variables.

### Installing a Local Build

1. From `src/plugins/cursor/content/`, build the extension: `npm run build`
2. Package it: `npx vsce package` (produces a `.vsix` file)
3. In Cursor, open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
4. Run **Extensions: Install from VSIX...**
5. Select the generated `.vsix` file

## Project Structure

```
braintrust-coding-agent-plugins/src/plugins/cursor/content/
├── .cursor-plugin/     # Cursor plugin manifest
├── hooks/              # Tracing hooks
├── mcp.json            # Braintrust MCP server
├── package.json        # Extension manifest
├── tsconfig.json       # TypeScript configuration
├── src/
│   └── extension.ts    # Main extension code
├── out/                # Compiled output (git-ignored)
└── README.md
```

## Scripts

- `npm run build` — Compile TypeScript
- `npm run watch` — Compile in watch mode
- `npm run lint` — Run ESLint (requires eslint to be installed)
- `npm run package` — Create a `.vsix` package
- `npm run publish:openvsx` — Publish to OpenVSX (for Cursor)
- `npm run publish:vscode` — Publish to VS Code Marketplace

## Publishing

The monorepo's **Release Plugin** workflow prepares a version pull request.
After that pull request is approved and merged, the workflow publishes the
generated Cursor plugin tree to `braintrustdata/braintrust-cursor-extension`
and then packages and publishes `braintrustdata.braintrust` to
[Open VSX](https://open-vsx.org/extension/braintrustdata/braintrust).
The version script updates the Cursor plugin manifest, `package.json`, and
`package-lock.json` together. Do not edit the distribution repository directly.

The Open VSX job checks out the exact approved merge commit, installs locked
dependencies, and packages the extension with `npm run package`. It saves the
VSIX as a workflow artifact before publishing that same file. Pull requests,
release preparation, `test-release.yml`, and `make publish` do not publish to
Open VSX. `npm run package` also creates a VSIX for local testing. Publishing
to the VS Code Marketplace remains a separate action.

### One-time Open VSX trusted publishing setup

The workflow uses
[Open VSX trusted publishing](https://github.com/eclipse-openvsx/openvsx/wiki/Trusted-Publishing)
with GitHub Actions OIDC; it does not need an `OVSX_PAT` secret.

1. In the **monorepo**, create the GitHub Actions environment `openvsx-cursor`
   under **Settings → Environments**. The release PR's approval and merge remain
   the authorization for publication; required environment reviewers are
   optional if you want an additional approval before the Open VSX job runs.
   Restrict deployment branches to `main`: for this merged `pull_request`
   event, GitHub sets the workflow ref to `refs/heads/main`.
2. Sign in to Open VSX as an **owner** of the `braintrustdata` namespace and
   ensure that account has signed the Publisher Agreement. Contributor access
   is insufficient to register a trusted publisher.
3. Open [Settings → Trusted Publishers](https://open-vsx.org/user-settings/trusted-publishers),
   select the `braintrustdata` namespace and `braintrust` extension, and register
   **GitHub Actions** with these exact values:

   | Field | Value |
   |---|---|
   | Organization or User name | `braintrustdata` |
   | Repository name | `braintrust-coding-agent-plugins` |
   | Workflow filename | `release.yml` |
   | Environment name | `openvsx-cursor` |

   Register the monorepo workflow, rather than the generated distribution
   repository or `_release.yml`. Merge this workflow into `main` before
   registering it. The extension must have at least one active published
   version; if it has none, a namespace owner must publish an initial version
   with an access token before registration is possible. The package's
   `publisher` must match the namespace's casing exactly (`braintrustdata`).
4. Keep `OVSX_PAT` out of the publishing job: an access token takes precedence
   over OIDC, even with `--trusted-publishing`. Existing Braintrust Bot secrets
   still handle distribution-repository deployment; no additional publishing
   secret is needed for Open VSX.

### Recovering a failed Open VSX publish

Fix the environment or trusted-publisher registration, then choose **Re-run
failed jobs** on the **Publish …** run in Release Plugin. The Open VSX job is
separate from distribution publication, so successfully completed tag and
deployment jobs are preserved. Re-running all jobs after the distribution
release succeeded fails its existing-tag check. Do not prepare another release
PR for the already-merged version. If an upload succeeded despite a reported
failure, check the published version before retrying; duplicate Open VSX
versions are rejected.
