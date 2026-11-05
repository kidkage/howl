import { readFile } from "node:fs/promises";
import { contrastPairs, contrastRatio, requiredRatio } from "./contrast.js";

const css = await readFile(new URL("./tokens.css", import.meta.url), "utf8");
const rootBlock = css.match(/:root\s*\{([^}]+)\}/)?.[1];
const darkBlock = css.match(/\[data-theme="dark"\]\s*\{([^}]+)\}/)?.[1];

if (!rootBlock || !darkBlock) throw new Error("Could not read the theme token blocks.");

function parseVariables(block) {
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()]));
}

const baseTokens = parseVariables(rootBlock);
const darkOverrides = parseVariables(darkBlock);

function resolve(name, tokens, seen = new Set()) {
  if (seen.has(name)) throw new Error(`Circular token reference: ${name}`);
  const value = tokens[name];
  if (!value) throw new Error(`Missing color token --${name}`);
  const ref = value.match(/^var\(--([\w-]+)\)$/);
  if (!ref) return value;
  seen.add(name);
  return resolve(ref[1], tokens, seen);
}

let failures = 0;
console.log("Mode | Pair | Foreground / background | Ratio | Required | Result");

for (const mode of ["light", "dark"]) {
  const tokens = { ...baseTokens, ...(mode === "dark" ? darkOverrides : {}) };
  for (const pair of contrastPairs) {
    const foreground = resolve(pair.fg, tokens);
    const background = resolve(pair.bg, tokens);
    const ratio = contrastRatio(foreground, background);
    const required = requiredRatio(pair.level);
    const passed = ratio >= required;
    if (!passed) failures += 1;
    console.log(
      `${mode} | ${pair.place} | ${foreground} / ${background} | ${ratio.toFixed(2)}:1 | ${required}:1 | ${passed ? "PASS" : "FAIL"}`,
    );
  }
}

if (failures) {
  console.error(`\n${failures} contrast pair(s) failed.`);
  process.exitCode = 1;
} else {
  console.log(`\nAll ${contrastPairs.length * 2} measured pairs pass.`);
}
