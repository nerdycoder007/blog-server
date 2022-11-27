import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import generateRandomName from "./generateRandomString.js";

// Filepath - where to save imgage
// Return path - https://domain/images/....

export async function fileUpload(file, filePath, returnPath) {
  if (file) {
    const _fileName = fileURLToPath(import.meta.url);

    const _dirname = path.dirname(_fileName);
    const { createReadStream, filename } = await file;
    const { ext } = path.parse(filename);
    const randomName = generateRandomName(12) + ext;
    const stream = createReadStream();
    const pathName = path.join(_dirname, `${filePath}/${randomName}`);

    // Place all files under the folder name of 'USERNAME'
    if (!fs.existsSync(pathName)) {
      fs.mkdirSync(path.join(_dirname, filePath), { recursive: true });
    }

    await stream.pipe(fs.createWriteStream(pathName));

    return `${returnPath}/${randomName}`;
  } else {
    return `${returnPath}/broken-image.jpg`;
  }
}
