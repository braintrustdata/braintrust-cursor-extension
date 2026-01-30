# Braintrust MCP Extension for Cursor

A Cursor extension that automatically connects the Braintrust MCP server, giving Cursor's AI assistant access to your Braintrust projects, experiments, and logs.

## Prerequisites

- [Cursor](https://cursor.com)
- A [Braintrust](https://braintrust.dev) API key

## Installation

Install from the Cursor extension marketplace:

1. Open Cursor
2. Go to Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for "Braintrust"
4. Click Install

## Setup

### 1. Set your API key

The extension reads your API key from the `BRAINTRUST_API_KEY` environment variable. Set this **before** launching Cursor.

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

### 2. Add Braintrust as a trusted domain

To allow the extension to authenticate without OAuth prompts:

1. Open Cursor Settings (`Cmd+,` / `Ctrl+,`)
2. Search for "trusted domains"
3. Add `braintrust.dev` to the list of trusted domains
4. Restart Cursor

## Usage

Once the extension is installed and `BRAINTRUST_API_KEY` is set, the Braintrust MCP server is automatically registered when Cursor starts. No manual steps required.

## Troubleshooting

### "BRAINTRUST_API_KEY is not set"

- Verify the variable is set: `echo $BRAINTRUST_API_KEY` (macOS/Linux) or `echo %BRAINTRUST_API_KEY%` (Windows)
- Cursor must be **restarted** after setting environment variables
- On macOS, launching Cursor from Spotlight/Dock may not inherit shell variables — launch from terminal instead

### Extension doesn't seem to work

- This extension only works in Cursor, not vanilla VS Code
- Ensure you're running a recent version of Cursor that supports the MCP Extension API

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and build instructions.

## License

MIT
