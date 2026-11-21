import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const gameDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => readFile(path.join(gameDir, name), "utf8");
const stripExports = (source) => source.replace(/^export\s+/gm, "");

const data = stripExports(await read("game-data.js"));
const logic = stripExports(await read("game-logic.js"));
const themeData = stripExports(await read("mob-theme-data.mjs"));
const player = stripExports((await read("mob-theme-player.js")).replace(/^import .*\r?\n/, ""));
const game = (await read("game.js")).replace(/^import .*\r?\n/gm, "");

const bundle = `"use strict";
(() => {
${data}
${logic}
${themeData}
${player}
${game}
})();
`;

await writeFile(path.join(gameDir, "game-bundle.js"), bundle);
console.log("Built game-bundle.js");
