import * as vscode from 'vscode';
import View from './View';

export class App {
  private ctx: vscode.ExtensionContext;
  private panel: vscode.WebviewPanel | null = null;

  constructor(ctx: vscode.ExtensionContext) {
    this.ctx = ctx;

    ctx.subscriptions.push(vscode.commands.registerCommand(
      'vite-vue.toggleWebview',
      this.webviewHandle.bind(this),
    ));
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

      this.panel.webview.html = View.html;

      this.panel.onDidChangeViewState(() => {
        if (this.panel?.visible) {
          console.log('---- 进入 ----');
        } else {
          console.log('---- 离开 ----');
        }
      });

      this.panel.onDidDispose(() => {
        this.panel = null;
      }, null, this.ctx.subscriptions);
    }
  }

  dispose() {
    this.panel?.dispose();
  }
}
