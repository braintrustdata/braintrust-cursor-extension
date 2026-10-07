# Contributing

The source for this plugin and extension lives in
[braintrust-coding-agent-plugins](https://github.com/braintrustdata/braintrust-coding-agent-plugins)
under `src/plugins/cursor/content/`. The
[braintrust-cursor-extension](https://github.com/braintrustdata/braintrust-cursor-extension)
repository is generated from this directory during a release. Make changes and
open pull requests in the monorepo.

## Development Setup

### Prerequisites

- Node.js 20.18.1 or newer
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
generated Cursor plugin tree to `braintrustdata/braintrust-cursor-extension`.
The version script updates the Cursor plugin manifest, `package.json`, and
`package-lock.json` together. Do not edit the distribution repository directly.

Publishing the VS Code extension to an extension marketplace is a separate
release action. `npm run package` creates a `.vsix` file for local testing.
