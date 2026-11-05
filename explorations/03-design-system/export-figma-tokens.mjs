import { readFile, writeFile } from "node:fs/promises";

const css = await readFile(new URL("./tokens.css", import.meta.url), "utf8");
const rootBlock = css.match(/:root\s*\{([^}]+)\}/)?.[1];
const darkBlock = css.match(/\[data-theme="dark"\]\s*\{([^}]+)\}/)?.[1];
if (!rootBlock || !darkBlock) throw new Error("Could not read the theme token blocks.");

function parseVariables(block) {
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()]));
}

function resolve(name, tokens, seen = new Set()) {
  if (seen.has(name)) throw new Error(`Circular token reference: ${name}`);
  const value = tokens[name];
  if (!value) throw new Error(`Missing token --${name}`);
  const ref = value.match(/^var\(--([\w-]+)\)$/);
  if (!ref) return value;
  seen.add(name);
  return resolve(ref[1], tokens, seen);
}

const base = parseVariables(rootBlock);
const dark = { ...base, ...parseVariables(darkBlock) };
const tokenDefinitions = [
  ["color/palette/violet/500", "COLOR", "color-violet-500"],
  ["color/palette/violet/700", "COLOR", "color-violet-700"],
  ["color/palette/violet/300", "COLOR", "color-violet-300"],
  ["color/palette/violet/200", "COLOR", "color-violet-200"],
  ["color/palette/violet/950", "COLOR", "color-violet-950"],
  ["color/palette/slate/950", "COLOR", "color-slate-950"],
  ["color/palette/neutral/950", "COLOR", "color-neutral-950"],
  ["color/palette/neutral/700", "COLOR", "color-neutral-700"],
  ["color/palette/neutral/500", "COLOR", "color-neutral-500"],
  ["color/palette/neutral/200", "COLOR", "color-neutral-200"],
  ["color/palette/neutral/100", "COLOR", "color-neutral-100"],
  ["color/palette/neutral/0", "COLOR", "color-neutral-0"],
  ...["lilac", "blue", "peach", "mint", "rose"].flatMap((tint) => [
    [`color/palette/avatar/${tint}`, "COLOR", `color-avatar-${tint}`],
    [`color/palette/avatar/${tint}-ink`, "COLOR", `color-avatar-${tint}-ink`],
  ]),
  ["color/brand/accent", "COLOR", "color-violet-500"],
  ["color/brand/accent-text-light", "COLOR", "color-violet-700"],
  ["color/brand/accent-text-dark", "COLOR", "color-violet-200"],
  ["color/brand/text-on-accent", "COLOR", "color-violet-950"],
  ["color/surface/page", "COLOR", "color-page"],
  ["color/surface/default", "COLOR", "color-surface"],
  ["color/surface/muted", "COLOR", "color-surface-muted"],
  ["color/text/primary", "COLOR", "color-text-primary"],
  ["color/text/secondary", "COLOR", "color-text-secondary"],
  ["color/text/link", "COLOR", "color-text-link"],
  ["color/text/brand", "COLOR", "color-text-accent"],
  ["color/border/subtle", "COLOR", "color-border-subtle"],
  ["color/border/control", "COLOR", "color-border-control"],
  ["color/focus/ring", "COLOR", "color-focus-ring"],
  ["color/button/default", "COLOR", "color-button"],
  ["color/button/hover", "COLOR", "color-button-hover"],
  ["color/button/pressed", "COLOR", "color-button-pressed"],
  ["color/button/disabled", "COLOR", "color-button-disabled"],
  ["color/button/disabled-text", "COLOR", "color-button-disabled-text"],
  ["color/control/icon", "COLOR", "color-icon-control"],
  ...["lilac", "blue", "peach", "mint", "rose"].flatMap((tint) => [
    [`color/avatar/${tint}`, "COLOR", `color-avatar-${tint}`],
    [`color/avatar/${tint}-ink`, "COLOR", `color-avatar-${tint}-ink`],
  ]),
  ["font/family/display", "STRING", "font-display"],
  ["font/family/body", "STRING", "font-body"],
  ["font/size/caption", "FLOAT", "font-size-caption"],
  ["font/size/body", "FLOAT", "font-size-body"],
  ["font/size/subtitle", "FLOAT", "font-size-subtitle"],
  ["font/size/story", "FLOAT", "font-size-story"],
  ["font/size/title", "FLOAT", "font-size-title"],
  ["font/size/display", "FLOAT", "font-size-display"],
  ["font/weight/author", "FLOAT", "font-weight-author"],
  ["line-height/tight", "FLOAT", "line-height-tight"],
  ["line-height/body", "FLOAT", "line-height-body"],
  ...["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"].map((size) => [
    `space/${size}`,
    "FLOAT",
    `space-${size}`,
  ]),
  ["radius/small", "FLOAT", "radius-small"],
  ["radius/card", "FLOAT", "radius-card"],
  ["radius/pill", "FLOAT", "radius-pill"],
  ["size/touch-target", "FLOAT", "size-touch-target"],
  ["size/icon", "FLOAT", "size-icon"],
  ["size/composer-min-height", "FLOAT", "size-composer-min-height"],
  ["size/indicator", "FLOAT", "size-indicator"],
  ["border/width", "FLOAT", "border-width"],
  ["focus/width", "FLOAT", "focus-width"],
  ["focus/offset", "FLOAT", "focus-offset"],
  ["shadow/card", "STRING", "shadow-card"],
  ["shadow/raised", "STRING", "shadow-raised"],
];

function typedValue(type, raw) {
  if (type === "COLOR") return raw.toLowerCase();
  if (type === "STRING") return raw.replace(/,\s*/g, ", ");
  if (raw.endsWith("rem")) return Number.parseFloat(raw) * 16;
  if (raw.endsWith("px")) return Number.parseFloat(raw);
  return Number(raw);
}

const variables = tokenDefinitions.map(([name, type, token]) => ({
  name,
  type,
  values: {
    Light: typedValue(type, resolve(token, base)),
    Dark: typedValue(type, resolve(token, dark)),
  },
}));

const output = {
  fileName: "Howl design system",
  collectionName: "Howl",
  modes: ["Light", "Dark"],
  source: "explorations/03-design-system/tokens.css",
  variables,
};

const target = new URL("./tokens.figma.json", import.meta.url);
await writeFile(target, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${variables.length} Figma variables to ${target.pathname}`);
