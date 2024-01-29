import fs from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const decompress = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const sourceFile = join(__dirname, "files", "archive.gz");
    const unzippedFile = join(__dirname, "files", "fileToCompress.txt");
    fs.createReadStream(sourceFile).pipe(zlib.createGunzip()).pipe(fs.createWriteStream(unzippedFile));
};

await decompress();
