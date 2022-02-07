
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
