import vscode = require('vscode');
import Helper from './Helper';

export default class StatusbarUi {
  private constructor() { }

  private static statusBarItem: vscode.StatusBarItem;

  /**
   * @see https://github.com/microsoft/vscode-extension-samples/blob/main/statusbar-sample/src/extension.ts
   */
  private static get statusbar() {
    if (!this.statusBarItem) {
      this.statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100,
      );
      this.statusBarItem.show();
    }
    return this.statusBarItem;
  }

  static init() {
    this.statusbar.text = 'Vite$(zap)Vue';
    this.statusbar.command = Helper.commands.TOGGLE_WEBVIEW;
    this.statusbar.tooltip = 'Click to show dashboard';
  }

  static dispose() {
    this.statusbar.dispose();
  }
}
