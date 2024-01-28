import { stdin, stdout } from "node:process";
import { Transform } from "node:stream";

const reverseString = new Transform({
    transform(data, encoding, callback) {
        this.push(data.toString().trim().split("").reverse().join("") + "\n");
        callback();
    },
});

const transform = async () => {
    stdin.pipe(reverseString).pipe(stdout);
};

await transform();
