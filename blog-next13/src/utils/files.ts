import path from "path";
import fs from "fs";

const root = process.env.PWD ?? "";
const markdownFolderPath = path.join(root, "/__posts");

const files = {
  read(fileName: string) {
    const filePath = path.join(markdownFolderPath, fileName);
    const content = fs.readFileSync(filePath, "utf-8");

    return content;
  },
  get(idx?: number) {
    const fileNames = fs.readdirSync(markdownFolderPath);

    return typeof idx === "number" ? this.read(fileNames[idx]) : fileNames.map(this.read);
  },
  count() {
    return fs.readdirSync(markdownFolderPath).length;
  },
};

export default files;
