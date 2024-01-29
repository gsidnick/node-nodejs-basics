import { createWriteStream } from "node:fs";
import { EOL } from "node:os";
import { dirname, join } from "node:path";
import { stdin, stdout } from "node:process";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const write = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filename = join(__dirname, "files", "fileToWrite.txt");
    const output = createWriteStream(filename, { encoding: "utf-8" });
    const rl = readline.createInterface({ input: stdin, output: stdout });
    rl.on("line", (data) => output.write(data + EOL));
};

await write();
