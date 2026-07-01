import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const output = resolve(root, "dist");
const productionFiles = ["index.html", "styles.css", "data.js", "app.js", "images"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of productionFiles) {
  await cp(resolve(root, file), resolve(output, file), { recursive: true });
}

console.log(`Static site built in ${output}`);
