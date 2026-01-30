import * as vscode from "vscode";

const SERVER_NAME = "braintrust";
const SERVER_URL = "https://api.braintrust.dev/mcp";
const ENV_VAR_NAME = "BRAINTRUST_API_KEY";

/**
 * Returns the Cursor MCP API if available, otherwise null.
 */
function getCursorMcpApi(): any | null {
  const cursor = (vscode as any).cursor;
  if (cursor?.mcp?.registerServer) {
    return cursor.mcp;
  }
  return null;
}

/**
 * Reads the Braintrust API key from the environment.
 * Returns null if not set or empty.
 */
function getApiKey(): string | null {
  const apiKey = process.env[ENV_VAR_NAME];
  if (!apiKey || apiKey.trim() === "") {
    return null;
  }
  return apiKey;
}

export function activate(_context: vscode.ExtensionContext): void {
  const mcpApi = getCursorMcpApi();
  if (!mcpApi) {
    return;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    vscode.window.showWarningMessage(
      `Braintrust MCP: ${ENV_VAR_NAME} is not set. Set it in your environment and restart Cursor.`
    );
    return;
  }

  try {
    mcpApi.registerServer({
      name: SERVER_NAME,
      server: {
        url: SERVER_URL,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    });
    vscode.window.showInformationMessage("Braintrust MCP server registered.");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    vscode.window.showErrorMessage(
      `Braintrust MCP: Failed to register server: ${message}`
    );
  }
}

export function deactivate(): void {
  const mcpApi = getCursorMcpApi();
  if (mcpApi?.unregisterServer) {
    try {
      mcpApi.unregisterServer(SERVER_NAME);
    } catch {
      // Ignore errors during cleanup
    }
  }
}
