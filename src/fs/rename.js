import { access, constants, rename as fsRename } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const wrongFilename = join(__dirname, "files", "wrongFilename.txt");
const properFilename = join(__dirname, "files", "properFilename.md");

const isExist = async (pathname) => {
    try {
        await access(pathname, constants.F_OK);
        return true;
    } catch (error) {
        if (error.code !== "ENOENT") console.error(error);
        return false;
    }
};

const rename = async () => {
    try {
        const isWrongFilenameExist = await isExist(wrongFilename);
        const isProperFilenameExist = await isExist(properFilename);
        if (!isWrongFilenameExist || isProperFilenameExist) throw new Error("FS operation failed");
        fsRename(wrongFilename, properFilename);
    } catch (error) {
        console.error(error);
    }
};

await rename();
