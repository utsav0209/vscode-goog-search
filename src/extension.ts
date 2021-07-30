import * as vscode from "vscode";

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  const URL = "https://www.google.com/search?q=";

  // Update integrated terminal configuration to copy selected text
  vscode.workspace
    .getConfiguration()
    .update(
      "terminal.integrated.copyOnSelection",
      true,
      vscode.ConfigurationTarget.Global
    );

  let editorSearch = vscode.commands.registerCommand(
    "goog-search.editor",
    () => {
      var editor = vscode.window.activeTextEditor;

      if (!editor) {
        return; // No open text editor
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      vscode.env.openExternal(vscode.Uri.parse(`${URL}${text}`));
    }
  );

  let terminalSearch = vscode.commands.registerCommand(
    "goog-search.terminal",
    async () => {
      const text = await vscode.env.clipboard.readText();

      vscode.env.openExternal(vscode.Uri.parse(`${URL}${text}`));
    }
  );

  context.subscriptions.push(editorSearch, terminalSearch);
}

// this method is called when your extension is deactivated
export function deactivate() {}
