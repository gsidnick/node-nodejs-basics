import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";
import { stdout } from "node:process";
import { fileURLToPath } from "node:url";

const calculateHash = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filename = join(__dirname, "files", "fileToCalculateHashFor.txt");
    const hash = createHash("sha256");
    const input = createReadStream(filename);

    input.on("readable", () => {
        const data = input.read();
        if (data) {
            hash.update(data);
        } else {
            stdout.write(`${hash.digest("hex")}`);
        }
    });
};

await calculateHash();
