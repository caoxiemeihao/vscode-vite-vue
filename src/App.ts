import vscode = require('vscode');
import Helper from './Helper';
import StatusbarUi from './StatusbarUi';
import View from './View';

export class App {
  private ctx: vscode.ExtensionContext;
  private panel: vscode.WebviewPanel | null = null;

  constructor(ctx: vscode.ExtensionContext) {
    this.ctx = ctx;

    StatusbarUi.init();

    ctx.subscriptions.push(vscode.commands.registerCommand(
      Helper.commands.TOGGLE_WEBVIEW,
      this.webviewHandle.bind(this),
    ));
  }

  /**
   * @see https://code.visualstudio.com/api/extension-guides/webview
   */
  private webviewHandle() {
    if (this.panel) {
      // If we already have a panel, show it in the target column (webview 单例)
      this.panel.reveal(vscode.window.activeTextEditor?.viewColumn);
    } else {
      this.panel = vscode.window.createWebviewPanel(
        Helper.APPID,
        Helper.WEB_TITLE,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        },
      );

      this.panel.webview.html = View.html;

      this.panel.onDidChangeViewState(() => {
        if (this.panel?.visible) {
          // console.log('---- 进入 ----');
        } else {
          // console.log('---- 离开 ----');
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
