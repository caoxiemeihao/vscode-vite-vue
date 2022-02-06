import vscode = require('vscode');
import fs = require('fs');
import template = require('lodash.template');
import Helper from './Helper';

export default class View {
  private constructor() { }

  private static _html: string;

  static get html() {
    if (!this._html) {
      try {
        const html = fs.readFileSync(Helper.rootResolve('src/public/index.html'), 'utf8');
        const compiled = template(html);
        this._html = compiled({ ROOT: `vscode-resource:${Helper.root}` });
      } catch (error) {
        const e = error as unknown as NodeJS.ErrnoException;
        vscode.window.showErrorMessage(e?.message || 'View.ts [get html] error.');
      }
    }
    return this._html;
  }
}
