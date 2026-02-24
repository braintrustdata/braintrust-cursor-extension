# Braintrust for Cursor

Connect Cursor to [Braintrust](https://braintrust.dev), giving Cursor's AI assistant access to your projects, experiments, and logs via MCP.

This repo provides two ways to install:

- **[Cursor Plugin](#install-as-plugin)** — lightweight MCP config, installed via the Cursor Marketplace
- **[VS Code Extension](#install-as-extension)** — auto-registers the MCP server on startup via the Cursor Extension API

## Prerequisites

- [Cursor](https://cursor.com)
- A [Braintrust](https://braintrust.dev) API key

## Install as Plugin

Install from the [Cursor Marketplace](https://cursor.com/marketplace):

1. Open Cursor
2. Run `/add-plugin` and search for "Braintrust", or install from `cursor.com/marketplace`
3. Set the `BRAINTRUST_API_KEY` environment variable (see [Setup](#set-your-api-key))

The plugin adds the Braintrust MCP server to your Cursor environment. No build step required.

## Install as Extension

Install from the Cursor extension panel:

1. Open Cursor
2. Go to Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for "Braintrust"
4. Click Install

The extension automatically registers the Braintrust MCP server when Cursor starts.

## Setup

### Set your API key

Both the plugin and extension read your API key from the `BRAINTRUST_API_KEY` environment variable. Set this **before** launching Cursor.

#### macOS / Linux

Add to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
export BRAINTRUST_API_KEY="your-api-key-here"
```

Then restart your terminal and Cursor.

#### Windows

Set the environment variable via System Properties > Environment Variables, or in PowerShell:

```powershell
[Environment]::SetEnvironmentVariable("BRAINTRUST_API_KEY", "your-api-key-here", "User")
```

Then restart PowerShell and Cursor.

## Troubleshooting

### "BRAINTRUST_API_KEY is not set"

- Verify the variable is set: `echo $BRAINTRUST_API_KEY` (macOS/Linux) or `echo %BRAINTRUST_API_KEY%` (Windows)
- Cursor must be **restarted** after setting environment variables
- On macOS, launching Cursor from Spotlight/Dock may not inherit shell variables — launch from terminal instead

### Extension doesn't seem to work

- The extension only works in Cursor, not vanilla VS Code
- Ensure you're running a recent version of Cursor that supports the MCP Extension API

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and build instructions.

## License

MIT
