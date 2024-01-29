import { access, constants, copyFile, mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceFolder = join(__dirname, "files");
const destinationFolder = join(__dirname, "files_copy");

const isExist = async (pathname) => {
    try {
        await access(pathname, constants.F_OK);
        return true;
    } catch (error) {
        if (error.code !== "ENOENT") console.error(error);
        return false;
    }
};

const copyDir = async (sourcePath, destinationPath) => {
    try {
        await mkdir(destinationPath, { recursive: true });
        const files = await readdir(sourcePath, { withFileTypes: true });
        if (files.length !== 0) {
            for (const file of files) {
                if (file.isDirectory()) {
                    const sourceFolder = join(sourcePath, file.name);
                    const destinationFolder = join(destinationPath, file.name);
                    await copyDir(sourceFolder, destinationFolder);
                } else {
                    const sourceFile = join(sourcePath, file.name);
                    const destinationFile = join(destinationPath, file.name);
                    await copyFile(sourceFile, destinationFile);
                }
            }
        }
        return true;
    } catch (error) {
        console.error(error);
    }
};

const copy = async () => {
    try {
        const isSourceFolderExist = await isExist(sourceFolder);
        const isDestinationFolderExist = await isExist(destinationFolder);
        if (!isSourceFolderExist || isDestinationFolderExist) throw new Error("FS operation failed");
        await copyDir(sourceFolder, destinationFolder);
    } catch (error) {
        console.error(error);
    }
};

await copy();
