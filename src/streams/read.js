import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";
import { stdout } from "node:process";
import { fileURLToPath } from "node:url";

const read = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filename = join(__dirname, "files", "fileToRead.txt");
    const input = createReadStream(filename, { encoding: "utf-8" });
    let data = "";

    input.on("data", (chunk) => (data += chunk));
    input.on("end", () => stdout.write(data));
    input.on("error", (error) => stdout.write(error.message));
};

await read();
