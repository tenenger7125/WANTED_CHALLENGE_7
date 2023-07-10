import path from "path";
import fs from "fs";

const root = process.env.PWD ?? "";
const markdownFolderPath = path.join(root, "/__posts");

export const files = {
  count() {
    return fs.readdirSync(markdownFolderPath).length;
  },
  get(idx?: number) {
    const fileNames = fs.readdirSync(markdownFolderPath);

    if (idx) {
      const filePath = path.join(markdownFolderPath, fileNames[idx]);
      const content = fs.readFileSync(filePath, "utf-8");

      return content;
    }

    return fileNames.map((fileName) => {
      const filePath = path.join(markdownFolderPath, fileName);
      const content = fs.readFileSync(filePath, "utf-8");

      return content;
    });
  },
};
