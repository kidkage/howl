export const contrastPairs = [
  { place: "Page copy", fg: "color-text-primary", bg: "color-page", level: "text" },
  { place: "Card copy", fg: "color-text-primary", bg: "color-surface", level: "text" },
  { place: "Secondary copy", fg: "color-text-secondary", bg: "color-page", level: "text" },
  { place: "Secondary copy on muted surface", fg: "color-text-secondary", bg: "color-surface-muted", level: "text" },
  { place: "Post metadata", fg: "color-text-secondary", bg: "color-surface", level: "text" },
  { place: "Placeholder", fg: "color-text-secondary", bg: "color-surface", level: "text" },
  { place: "Link", fg: "color-text-link", bg: "color-page", level: "text" },
  { place: "Link in a card", fg: "color-text-link", bg: "color-surface", level: "text" },
  { place: "Link on a muted surface", fg: "color-text-link", bg: "color-surface-muted", level: "text" },
  { place: "Brand wordmark (36px)", fg: "color-text-accent", bg: "color-page", level: "large" },
  { place: "Large accent sample in a card", fg: "color-text-accent", bg: "color-surface", level: "large" },
  { place: "Accent button label", fg: "color-text-on-accent", bg: "color-button", level: "text" },
  { place: "Button icon", fg: "color-text-on-accent", bg: "color-button", level: "nontext" },
  { place: "Button fill on page", fg: "color-button", bg: "color-page", level: "nontext" },
  { place: "Button fill on surface", fg: "color-button", bg: "color-surface", level: "nontext" },
  { place: "Hover button fill on page", fg: "color-button-hover", bg: "color-page", level: "nontext" },
  { place: "Hover button fill on surface", fg: "color-button-hover", bg: "color-surface", level: "nontext" },
  { place: "Pressed button fill on page", fg: "color-button-pressed", bg: "color-page", level: "nontext" },
  { place: "Hover button label", fg: "color-text-on-accent", bg: "color-button-hover", level: "text" },
  { place: "Pressed button label", fg: "color-text-on-accent", bg: "color-button-pressed", level: "text" },
  { place: "Selected button label", fg: "color-text-on-accent", bg: "color-button", level: "text" },
  { place: "Disabled button label", fg: "color-button-disabled-text", bg: "color-button-disabled", level: "text" },
  { place: "Comment/share icon controls", fg: "color-icon-control", bg: "color-surface", level: "nontext" },
  { place: "Comment/share controls on hover", fg: "color-icon-control", bg: "color-surface-muted", level: "nontext" },
  { place: "Focus ring on page", fg: "color-focus-ring", bg: "color-page", level: "nontext" },
  { place: "Focus ring on card", fg: "color-focus-ring", bg: "color-surface", level: "nontext" },
  { place: "Focus ring on muted surface", fg: "color-focus-ring", bg: "color-surface-muted", level: "nontext" },
  { place: "Text field border", fg: "color-border-control", bg: "color-surface", level: "nontext" },
  { place: "Selected tab text", fg: "color-text-primary", bg: "color-surface", level: "text" },
  { place: "Selected tab marker", fg: "color-violet-500", bg: "color-surface", level: "nontext" },
  { place: "Decorative accent marker", fg: "color-violet-500", bg: "color-surface-muted", level: "nontext" },
  { place: "Avatar initials 1", fg: "color-avatar-1-ink", bg: "color-avatar-1", level: "text" },
  { place: "Avatar initials 2", fg: "color-avatar-2-ink", bg: "color-avatar-2", level: "text" },
  { place: "Avatar initials 3", fg: "color-avatar-3-ink", bg: "color-avatar-3", level: "text" },
  { place: "Avatar initials 4", fg: "color-avatar-4-ink", bg: "color-avatar-4", level: "text" },
  { place: "Avatar initials 5", fg: "color-avatar-5-ink", bg: "color-avatar-5", level: "text" },
  { place: "Composer text", fg: "color-text-primary", bg: "color-surface", level: "text" },
  { place: "Composer placeholder", fg: "color-text-secondary", bg: "color-surface", level: "text" },
  { place: "Post card story", fg: "color-text-primary", bg: "color-surface", level: "text" },
  { place: "Event card title", fg: "color-text-primary", bg: "color-surface", level: "text" },
  { place: "Event card details", fg: "color-text-secondary", bg: "color-surface", level: "text" },
  { place: "Contrast note text", fg: "color-text-primary", bg: "color-surface-muted", level: "text" },
];

export const initialFailures = [
  {
    place: "White text on the requested accent (#c524ff)",
    mode: "Light and dark",
    foreground: "#ffffff",
    background: "#c524ff",
    ratio: 4.14,
    required: 4.5,
    fix: "Use the same-hue deep violet #240033 for text/icons on accent fills.",
  },
  {
    place: "Accent link text (#c524ff)",
    mode: "Light",
    foreground: "#c524ff",
    background: "#ffffff",
    ratio: 4.14,
    required: 4.5,
    fix: "Use #7d00aa for small accent text; keep #c524ff for large display text and markers.",
  },
  {
    place: "Accent link text (#c524ff)",
    mode: "Dark",
    foreground: "#c524ff",
    background: "#17202b",
    ratio: 3.97,
    required: 4.5,
    fix: "Use the lighter same-hue #e085ff for dark-mode links.",
  },
  {
    place: "Accent link text (#c524ff) on a muted dark surface",
    mode: "Dark",
    foreground: "#c524ff",
    background: "#29323d",
    ratio: 3.13,
    required: 4.5,
    fix: "Use the lighter same-hue #e085ff for dark-mode links on muted surfaces too.",
  },
];

export function relativeLuminance(hex) {
  const channels = hex.match(/[0-9a-f]{2}/gi)?.map((channel) => parseInt(channel, 16) / 255);
  if (!channels || channels.length !== 3) {
    throw new Error(`Expected a six-digit hex color, received "${hex}"`);
  }
  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrastRatio(foreground, background) {
  const values = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

export function requiredRatio(level) {
  return level === "nontext" || level === "large" ? 3 : 4.5;
}
