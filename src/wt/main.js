import os from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const createWorker = (value) => {
    return new Promise((resolve, reject) => {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const workerFile = join(__dirname, "worker.js");
        const worker = new Worker(workerFile, { workerData: { n: value } });
        worker.on("message", (result) => {
            resolve({
                status: "resolved",
                data: result,
            });
        });
        worker.on("error", (error) => {
            reject({
                status: "error",
                data: null,
            });
        });
    });
};

const performCalculations = async () => {
    const promises = [];
    const result = [];

    os.cpus().forEach((cpu, index) => {
        const n = 10 + index;
        promises.push(createWorker(n));
    });

    const promisesResult = await Promise.allSettled(promises);
    promisesResult.forEach((obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            if (key.match(/value|reason/)) {
                result.push(value);
            }
        });
    });

    console.log(result);
};

await performCalculations();
