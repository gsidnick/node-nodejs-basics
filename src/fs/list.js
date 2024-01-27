import { access, constants, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolder = join(__dirname, "files");

const isExist = async (pathname) => {
    try {
        await access(pathname, constants.F_OK);
        return true;
    } catch (error) {
        if (error.code !== "ENOENT") console.error(error);
        return false;
    }
};

const list = async () => {
    try {
        const isFilesFolderExist = await isExist(filesFolder);
        if (!isFilesFolderExist) throw new Error("FS operation failed");

        const files = await readdir(filesFolder, { withFileTypes: true });
        if (files.length !== 0) {
            for (const file of files) {
                console.log(file.name);
            }
        }
    } catch (error) {
        console.error(error);
    }
};

await list();
