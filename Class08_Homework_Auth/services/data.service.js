import { writeFile, readFile } from "node:fs/promises";

export class DataService {
  static async readJSONFile(path) {
    const stringData = await readFile(path, "utf-8");
    return JSON.parse(stringData);
  }
  static async saveJSONFile(path, data) {
    return writeFile(path, JSON.stringify(data, 0, 2));
  }
}
