import * as vscode from 'vscode';
import View from './View';

export class App {
  private static commands: Record<string, any> = {};
  private panel: vscode.WebviewPanel | null = null;

  constructor(ctx: vscode.ExtensionContext) {

    const TOGGLE_WEBVIEW = 'vite-vue.toggleWebview';
    ctx.subscriptions.push(vscode.commands.registerCommand(TOGGLE_WEBVIEW, () => {
      if (App.commands[TOGGLE_WEBVIEW]) {
        if (this.panel) {
          this.panel.reveal(vscode.window.activeTextEditor?.viewColumn);
        } else {
          this.webviewHandle();
        }
      } else {
        App.commands[TOGGLE_WEBVIEW] = {};
        this.webviewHandle();
      }
    }));
  }

  private webviewHandle() {
    if (this.panel) {
      this.panel.reveal(vscode.window.activeTextEditor?.viewColumn);
    } else {
      this.panel = vscode.window.createWebviewPanel(
        'vite-vue view',
        'vite ⚡️ vue',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        },
      );

      if (this.panel?.webview) {
        this.panel.webview.html = View.html;
      }
    }

    // this.panel.onDidChangeViewState((...args) => {});

    this.panel.onDidDispose(() => {
      this.panel = null;
    });
  }

  dispose() {
    this.panel?.dispose();
  }
}
