
// @ts-ignore
export const vscode = acquireVsCodeApi() as {
  getState: () => any;
  postMessage: (message: {
    command: string;
    payload: any;
    [key: string]: any;
  }, transfer?: any) => void;
  setState: (newState: any) => void;
}

export function replaceVSCodeUri(asset: string) {
  return asset.replace(/\/\{\{DIST\}\}/, window.vscode_webview_uri_view);
}
