import * as vscode from 'vscode';
import * as fs from 'fs';
import Helper from './Helper';

export default class View {
  private static _html: string;

  private constructor() { }

  static get html() {
    if (!this._html) {
      try {
        const tplPath = Helper.rootResolve('src/public/index.html');
        this._html = fs.readFileSync(tplPath, 'utf8');
      } catch (error) {
        vscode.window.showErrorMessage(error as string);
      }
    }
    return this._html;
  }
}
