import vscode = require('vscode');
import fs = require('fs');
import path = require('path');
import Helper from './Helper';

export default class View {
  private constructor() { }

  private static _html: string;

  static get html() {
    if (!this._html) {
      try {
        const viewPath = Helper.rootResolve('out/view');
        const html = fs.readFileSync(path.join(viewPath, 'index.html'), 'utf8');

        // Replacement vscode source uri
        const sourceUri = Helper.SOURCE_TAG + viewPath;
        this._html = html.replace(/\/\{\{DIST\}\}/g, sourceUri);
      } catch (error) {
        const e = error as unknown as NodeJS.ErrnoException;
        vscode.window.showErrorMessage(e?.message || 'View.ts [get html] error.');
      }
    }
    return this._html;
  }
}
