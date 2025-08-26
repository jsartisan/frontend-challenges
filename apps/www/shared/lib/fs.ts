import path from "path";
import fs from "fs-extra";

/**
 * if src is a file, copy it to dest
 * if src is a folder, copy all files in it to dest
 *
 * @param src
 * @param dest
 */
export function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

/**
 * copy all files in srcDir to destDir
 *
 * @param srcDir
 * @param destDir
 */
function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });

  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);

    copy(srcFile, destFile);
  }
}

/**
 * empty the dir
 *
 * @param dir
 * @returns
 */
export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

/**
 * create a dir if it doesn't exist
 *
 * @param path
 */
export function createDir(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

/**
 * write content to a file
 *
 * @param file
 * @param content
 */
export function writeFile(file: string, content: string) {
  fs.writeFileSync(file, content);
}

/**
 * loads a file from the file system
 *
 * @param filepath
 * @returns
 */
export async function loadFile(filepath: string) {
  if (fs.existsSync(filepath)) return await fs.readFile(filepath, "utf-8");

  return undefined;
}
