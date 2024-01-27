import { access, constants, open } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filename = join(__dirname, "files", "fileToRead.txt");

const isExist = async (pathname) => {
    try {
        await access(pathname, constants.F_OK);
        return true;
    } catch (error) {
        if (error.code !== "ENOENT") console.error(error);
        return false;
    }
};

const read = async () => {
    try {
        const isFileExist = await isExist(filename);
        if (!isFileExist) throw new Error("FS operation failed");
        const fd = await open(filename, "r");
        const data = await fd.readFile({ encoding: "utf-8" });
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

await read();
