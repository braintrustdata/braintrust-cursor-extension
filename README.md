# Braintrust tracing for Cursor

> **This repository is generated.** It is built from
> [braintrustdata/braintrust-coding-agent-plugins](https://github.com/braintrustdata/braintrust-coding-agent-plugins).
> Make changes there; releases publish the generated plugin to this repository.

Connect Cursor to [Braintrust](https://braintrust.dev) through MCP and trace
agent sessions with the `braintrust` plugin. The same repository also contains
the Braintrust VS Code extension for Cursor.

## Prerequisites

- A [Braintrust account](https://braintrust.dev)
- Cursor with the CLI or desktop app
- The [Braintrust CLI](https://www.braintrust.dev/docs/reference/cli/quickstart)
- A Braintrust API key to use the MCP server

## Install from Cursor Marketplace

Use `/add-plugin` in Cursor and search for **Braintrust**, or install from the
[Cursor Marketplace](https://cursor.com/marketplace). The plugin registers the
Braintrust MCP server and tracing hooks. For tracing, install and authenticate
the `bt` CLI, then run `bt trace enable cursor --project my-coding-agent`.

The Braintrust MCP server uses `https://api.braintrust.dev/mcp`. Configure its
`BRAINTRUST_API_KEY` variable in Cursor's plugin settings. MCP access and tracing
use separate authentication: `bt login` authenticates the tracing CLI.

The existing VS Code extension remains available from Cursor's extension
panel. It reads `BRAINTRUST_API_KEY` from Cursor's environment and registers
the same MCP server through Cursor's extension API. If
both the extension and plugin are installed, each attempts to register a
server named `braintrust`; use one MCP installation to avoid duplicates.

## Supported Cursor surfaces

The plugin works with Cursor CLI and desktop.
Its hooks invoke `bt trace hook` directly, so the Braintrust CLI must be on
Cursor's `PATH` when hooks run.

## Quickstart

Authenticate and enable tracing:

```bash
bt login
bt trace enable cursor --project my-coding-agent
```

Setup installs or refreshes the local `braintrust` plugin, configures the hooks
needed to trace Cursor sessions, and saves the selected route in
`~/.cursor/braintrust.json`.
Cursor must allow local plugin imports. Reload the Cursor window after setup so
the plugin is active.

Use `--profile` or `--org` to select a different Braintrust account or
organization. To use MCP, configure `BRAINTRUST_API_KEY` in Cursor's plugin settings.

## Data handling

Tracing sends Cursor's available session, prompt, response, and tool information
to Braintrust. Depending on what Cursor provides, this can include prompts,
assistant responses, tool inputs and results, and session metadata. Transcript
imports contain less information than live tracing and may omit tool details.

Captured content can include confidential instructions, file contents, or
secrets. The plugin does not redact content locally. Configure Braintrust's
content-redaction controls before enabling tracing, and don't trace content
that must not be sent to Braintrust.

## Additional root metadata

Add a JSON object to the root span of every Cursor session:

```bash
bt trace enable cursor --project my-coding-agent \
  --additional-metadata '{"team":"platform","environment":"dev"}'
```

Standard session metadata takes precedence if keys conflict.

## Root-span tags

Use repeatable `--tag` options for filterable tags on root spans:

```bash
bt trace enable cursor --tag ci --tag release-validation
bt trace run cursor --tag ci
bt trace import cursor SESSION_ID --tag historical-import
```

## One-off runs and transcript import

```bash
bt trace run --project my-coding-agent cursor
bt trace import cursor SESSION_ID
bt trace import cursor SESSION_ID --attach
```

`run` traces one Cursor invocation without changing saved settings. Import reads
a saved Cursor transcript; `--attach` follows it until Ctrl-C. Imports include
conversation text and the final recorded turn status. They omit tool activity
and usage, and session timing may be approximate. Cursor may retain only the
latest turn in a transcript.

Managed Cursor runs require interactive CLI mode. Cursor's `-p`/`--print` mode
does not provide the full lifecycle needed for a complete trace.

## Manage tracing

```bash
bt trace doctor cursor
bt trace status
bt trace update cursor
bt trace disable cursor
```
