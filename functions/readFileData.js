import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import generateRandomName from "./generateRandomString.js";

// Filepath - where to save imgage
// Return path - https://domain/images/....

export default async function readFileData(file, filePath, returnPath) {
  if (file) {
    const _fileName = fileURLToPath(import.meta.url);

    const _dirname = path.dirname(_fileName);
    const { createReadStream, filename } = await file;
    const { ext } = path.parse(filename);
    const fileName = generateRandomName(12) + ext;
    const stream = createReadStream();
    const pathName = path.join(_dirname, `${filePath}/${fileName}`);

    // Place all files under the folder name of 'USERNAME'
    if (!fs.existsSync(pathName)) {
      fs.mkdir(
        path.join(_dirname, filePath),
        { recursive: true },
        (err, data) => {}
      );
    }

    const fileContent = await new Promise((resolve, reject) =>
      createReadStream()
        .on("data", (data) => {
          resolve(data.toString());
        })
        .pipe(fs.createWriteStream(pathName))
    );

    return fileContent;
  } else {
    return `${returnPath}/broken-image.jpg`;
  }
}
