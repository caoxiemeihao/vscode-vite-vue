import vscode = require('vscode');
import Helper from './Helper';
import StatusbarUi from './StatusbarUi';
import View from './View';

export class App {
  private panel: vscode.WebviewPanel | null = null;

  constructor(
    private ctx: vscode.ExtensionContext,
  ) {
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

      this.panel.webview.html = View.getHtml(this.panel.webview);
      this.panel.webview.onDidReceiveMessage(this.onDidReceiveMessage.bind(this));
      this.panel.onDidChangeViewState(this.onDidChangeViewState.bind(this));
      this.panel.onDidDispose(this.onDidDispose.bind(this), null, this.ctx.subscriptions);
    }
  }

  private onDidReceiveMessage(message: { command: string; payload: any; }) {
    const { command, payload } = message;

    switch (command) {
      case '@fetch/plugins':
        break;

      default:
        break;
    }
  }

  private onDidChangeViewState() {
    if (this.panel?.visible) {
      // console.log('---- 进入 ----');
    } else {
      // console.log('---- 离开 ----');
    }
  }

  private onDidDispose() {
    this.panel = null;
  }

  dispose() {
    this.panel?.dispose();
  }
}
