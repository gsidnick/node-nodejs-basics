import { access, constants, open } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filename = join(__dirname, "files", "fresh.txt");

const isExist = async (pathname) => {
    try {
        await access(pathname, constants.F_OK);
        return true;
    } catch (error) {
        if (error.code !== "ENOENT") console.error(error);
        return false;
    }
};

const create = async () => {
    try {
        const isFileExist = await isExist(filename);
        if (isFileExist) throw new Error("FS operation failed");
        const fd = await open(filename, "w");
        await fd.writeFile("I am fresh and young");
        await fd.close();
    } catch (error) {
        console.error(error);
    }
};

await create();
