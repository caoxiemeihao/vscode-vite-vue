import * as path from 'path';

export default class Helper {
  static root = path.join(__dirname, '../');

  static rootResolve(...paths: string[]) {
    return path.join(Helper.root, ...paths);
  }
}
