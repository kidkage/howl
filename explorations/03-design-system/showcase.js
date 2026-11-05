import { contrastPairs, contrastRatio, initialFailures, requiredRatio } from "./contrast.js";

const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const modeLabel = document.querySelector("#mode-label");
const storedTheme = localStorage.getItem("howl-design-system-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const colorTokens = [
  ["color-violet-500", "Howl violet — exact accent"],
  ["color-violet-700", "Accessible violet text"],
  ["color-violet-300", "Accessible light violet text"],
  ["color-violet-200", "Accessible dark-mode link text"],
  ["color-violet-950", "Text on accent fill"],
  ["color-slate-950", "Campus slate"],
  ["color-neutral-950", "Near-black"],
  ["color-neutral-700", "Muted gray"],
  ["color-neutral-500", "Accessible dark-mode border"],
  ["color-neutral-200", "Pale gray"],
  ["color-neutral-100", "Soft page gray"],
  ["color-neutral-0", "White surface"],
  ["color-avatar-lilac", "Avatar lilac tint"],
  ["color-avatar-blue", "Avatar blue tint"],
  ["color-avatar-peach", "Avatar peach tint"],
  ["color-avatar-mint", "Avatar mint tint"],
  ["color-avatar-rose", "Avatar rose tint"],
  ["color-avatar-lilac-ink", "Avatar lilac ink"],
  ["color-avatar-blue-ink", "Avatar blue ink"],
  ["color-avatar-peach-ink", "Avatar peach ink"],
  ["color-avatar-mint-ink", "Avatar mint ink"],
  ["color-avatar-rose-ink", "Avatar rose ink"],
  ["color-page", "Role · page"],
  ["color-surface", "Role · reading surface"],
  ["color-surface-muted", "Role · muted surface"],
  ["color-text-primary", "Role · primary text"],
  ["color-text-secondary", "Role · secondary text"],
  ["color-text-link", "Role · link text"],
  ["color-text-accent", "Role · large brand accent"],
  ["color-text-on-accent", "Role · text on accent"],
  ["color-border-subtle", "Role · subtle divider"],
  ["color-border-control", "Role · control border"],
  ["color-focus-ring", "Role · focus ring"],
  ["color-button", "Role · button"],
  ["color-button-hover", "Role · button hover"],
  ["color-button-pressed", "Role · button pressed"],
  ["color-button-disabled", "Role · button disabled"],
  ["color-button-disabled-text", "Role · disabled button text"],
  ["color-icon-control", "Role · comment/share controls"],
];

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
  themeButton.textContent = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
  modeLabel.textContent = `${theme[0].toUpperCase()}${theme.slice(1)} mode`;
  localStorage.setItem("howl-design-system-theme", theme);
  renderContrastTable(theme);
  updateSwatches();
}

function colorValue(token) {
  return getComputedStyle(root).getPropertyValue(`--${token}`).trim();
}

function renderContrastTable(theme) {
  const body = document.querySelector("#contrast-results");
  body.replaceChildren();

  for (const pair of contrastPairs) {
    const foreground = colorValue(pair.fg);
    const background = colorValue(pair.bg);
    const ratio = contrastRatio(foreground, background);
    const required = requiredRatio(pair.level);
    const pass = ratio >= required;
    const row = document.createElement("tr");
    const columns = [
      pair.place,
      pair.level === "text" ? "Text (4.5:1)" : `${pair.level === "large" ? "Large text" : "Non-text"} (3:1)`,
      foreground,
      background,
      `${ratio.toFixed(2)}:1 (≥ ${required}:1)`,
      pass ? "PASS" : "FAIL",
    ];
    for (const [index, value] of columns.entries()) {
      const cell = document.createElement("td");
      cell.textContent = value;
      if (index === 5) cell.className = pass ? "result-pass" : "result-fail";
      row.append(cell);
    }
    body.append(row);
  }

  document.querySelector("#contrast-mode").textContent = `${theme[0].toUpperCase()}${theme.slice(1)} mode`;
}

function renderInitialFailures() {
  const body = document.querySelector("#initial-failures");
  body.replaceChildren();
  for (const failure of initialFailures) {
    const row = document.createElement("tr");
    for (const value of [
      failure.place,
      failure.mode,
      `${failure.foreground} on ${failure.background}`,
      `${failure.ratio.toFixed(2)}:1 (required ${failure.required}:1)`,
      failure.fix,
    ]) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    }
    body.append(row);
  }
}

themeButton.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const swatches = document.querySelector("#token-swatches");
for (const [token, label] of colorTokens) {
  const swatch = document.createElement("div");
  swatch.className = "swatch";
  swatch.dataset.token = token;
  const color = document.createElement("div");
  color.className = "swatch-color";
  const description = document.createElement("div");
  description.className = "swatch-label";
  const title = document.createElement("strong");
  title.textContent = label;
  const value = document.createElement("code");
  description.append(title, value);
  swatch.append(color, description);
  swatches.append(swatch);
}

function updateSwatches() {
  document.querySelectorAll("[data-token]").forEach((swatch) => {
    const token = swatch.dataset.token;
    const value = colorValue(token);
    swatch.querySelector(".swatch-color").style.backgroundColor = value;
    swatch.querySelector("code").textContent = value;
  });
}

document.querySelectorAll("[data-spacing]").forEach((bar) => {
  bar.style.width = `var(--${bar.dataset.spacing})`;
});

renderInitialFailures();
setTheme(storedTheme || preferredTheme);
