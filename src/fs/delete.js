import { access, constants, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filename = join(__dirname, "files", "fileToRemove.txt");

const isExist = async (pathname) => {
    try {
        await access(pathname, constants.F_OK);
        return true;
    } catch (error) {
        if (error.code !== "ENOENT") console.error(error);
        return false;
    }
};

const remove = async () => {
    try {
        const isFileToRemoveExist = await isExist(filename);
        if (!isFileToRemoveExist) throw new Error("FS operation failed");
        unlink(filename);
    } catch (error) {
        console.error(error);
    }
};

await remove();
