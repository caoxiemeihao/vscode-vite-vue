import vscode = require('vscode');
import fs = require('fs');
import path = require('path');
import Helper from './Helper';

export default class View {
  private constructor() { }

  private static html: string;

  static getHtml(webview: vscode.Webview) {
    if (!this.html) {
      try {
        const viewPath = Helper.rootResolve('out/view');
        const html = fs.readFileSync(path.join(viewPath, 'index.html'), 'utf8');
        const DIST_RE = /"(\/\{\{DIST\}\})(.*)"/;

        this.html = html
          .split('\n')
          .map((line) => {
            if (line.trim() === '</head>') {
              // Inject the `out/view` path form runtime import assets
              const webviewUriView = webview.asWebviewUri(vscode.Uri.file(viewPath));
              return `
  <script>window.vscode_webview_uri_view = "${webviewUriView.toString()}";</script>
</head>
`.trim();
            }

            const matched = line.match(DIST_RE);
            if (!matched) {
              return line;
            }

            const [, dist, asset] = matched;
            const assetPath = path.posix.join(viewPath, asset);
            // Compatible VSCode/Electron version
            // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.78.1 Chrome/108.0.5359.215 Electron/22.5.1 Safari/537.36'
            const webviewUri = webview.asWebviewUri(vscode.Uri.file(assetPath));

            return line.replace(dist + asset, webviewUri.toString());
          })
          .join('\n');
      } catch (error) {
        const e = error as unknown as NodeJS.ErrnoException;
        vscode.window.showErrorMessage(e?.message || 'View.ts [get html] error.');
      }
    }

    return this.html;
  }
}
