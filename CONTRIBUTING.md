# Contributing

## Development Setup

### Prerequisites

- Node.js 18+
- npm

### Build from Source

```bash
# Clone the repository
git clone https://github.com/braintrustdata/cursor-extension.git
cd cursor-extension

# Install dependencies
npm install

# Build the extension
npm run build
```

### Running in Development

1. Open this folder in Cursor
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

1. Build the extension: `npm run build`
2. Package it: `npx vsce package` (produces a `.vsix` file)
3. In Cursor, open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
4. Run **Extensions: Install from VSIX...**
5. Select the generated `.vsix` file

## Project Structure

```
cursor-extension/
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

Cursor uses [OpenVSX](https://open-vsx.org), not the VS Code Marketplace. You need to publish to OpenVSX for extensions to appear in Cursor.

### First-time setup (OpenVSX)

1. Sign in at https://open-vsx.org with GitHub
2. Get an access token from https://open-vsx.org/user-settings/tokens
3. Create the namespace (one-time):
   ```bash
   npx ovsx create-namespace braintrustdata -p <your-token>
   ```

### Publishing a release

1. Update the version in `package.json`
2. Build and publish to OpenVSX:
   ```bash
   npm run build
   npx ovsx publish -p <your-token>
   ```

Or to package without publishing (for testing):
```bash
npm run package
# creates braintrust-x.x.x.vsix
```
