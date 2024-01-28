import fs from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const compress = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const sourceFile = join(__dirname, "files", "fileToCompress.txt");
    const zippedFile = join(__dirname, "files", "archive.gz");
    fs.createReadStream(sourceFile).pipe(zlib.createGzip()).pipe(fs.createWriteStream(zippedFile));
};

await compress();
