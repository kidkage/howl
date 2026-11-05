# Howl design system showcase

Open `index.html` through the repository's existing Vite server at `/explorations/03-design-system/`. Use the theme switcher to review both modes; it remembers the selected mode in this browser.

The showcase is isolated from the real app and earlier exploration rounds. It follows the approved Round 02B “Bigger Beat” direction: Georgia display type, Arial UI/story text, the original soft avatar tints, slate framing, white surfaces, quiet separators, and 19px story copy. The requested Howl violet is exactly `#c524ff`.

The component gallery includes accent buttons with normal, hover, pressed, selected, and disabled states; a casual post composer; a post card with a circular profile picture, recognizable comment bubble and share-arrow icons; and a campus event card with “I'm going” states. Every button label is action-specific and avoids a generic “Submit.”

The source tokens are in `tokens.css`. Light and dark themes change semantic role tokens without changing the underlying palette or type/spacing system. Accessible same-hue roles (`#7d00aa` for small light-mode accent text and `#e085ff` for dark-mode links) are used where the requested accent itself does not meet normal-text contrast. Button text on the exact accent uses `#240033`.

Run the two-mode WCAG AA check from the repository root:

```sh
node explorations/03-design-system/check-contrast.mjs
```

The page also shows the first-pass failures and their measured values, followed by every measured final foreground/background pair for the selected mode.

Generate the Figma variables payload from the current CSS source tokens:

```sh
node explorations/03-design-system/export-figma-tokens.mjs
```

This writes `tokens.figma.json`, a machine-readable Light/Dark collection covering color roles, avatar colors, typography, spacing, and radii. Keep `tokens.css` as the source of truth; regenerate the payload after changing design tokens, then update the matching Figma variables.
