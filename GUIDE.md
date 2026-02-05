# User Guide

This guide will help you get the most out of MorpherPro.

## 1. Importing SVGs

You can get your icons into the tool in three ways:

### A. Icon Browser

- Click the **"Open Library"** button in the sidebar.
- Browse or search through **1,900+ Lucide icons**.
- Click any icon to load it instantly as a Start or End path.

### B. Upload File

- Click the **"Upload SVG"** link in the **Path Playground** (sidebar bottom).
- Select any standard `.svg` file.
- The tool will automatically extract path data and set the `viewBox`.

### C. Paste Code

- Copy key **path data** (`d="..."`) or the entire `<svg>` code.
- Paste it directly into the **"Start Path"** or **"End Path"** text areas.

## 2. Rendering Modes

Icons come in two main flavors. Use the **Render** toggle to switch:

### Fill Mode

- **Best for**: Solid shapes (e.g., FontAwesome Solid, Material Icons).
- **Behavior**: Icons are filled with color.

### Stroke Mode

- **Best for**: Line art (e.g., Lucide, Heroicons Outline).
- **Behavior**: Icons are drawn with lines.
- _Note: If your morph looks distorted, try switching to this mode._

## 3. Color Modes

Choose how the SVG gets colored:

- **CSS (currentColor)**: Inherits color from parent elements. Best for dynamic theming.
- **Solid**: Uses a specific fixed hex/rgb color.
- **Gradient**: Applies a linear gradient with start and end colors.

## 4. Fixing "Cut Off" Icons

If your icon looks zoomed in or cut off, check the **ViewBox** input.

- Defaults to `0 0 24 24`.
- If your icon was drawn on a larger canvas (like 512px), update it to match (e.g., `0 0 512 512`).

## 5. Animation Controls

### Progress & Duration

- **Progress Slider**: Scrub through the animation frame-by-frame.
- **Duration**: Set animation speed (300ms - 3000ms).

### Easing Functions

Click any easing button to preview the animation:

- **Linear**: Constant speed.
- **Ease**: Smooth acceleration/deceleration.
- **Glitch**: Adds random noise/jitter.
- **Wobble**: Adds a sine-wave oscillation.
- **Elastic**: Strong overshoot.

## 6. Export & Share

### Share Link

- Click the **Share** button to generate a URL that saves your current paths and settings.

### Export Dropdown

Click **Export** to access:

1. **SVG File**: Download a standalone animated .svg file.
2. **React (JSX)**: Copy code for React component (using Framer Motion).
3. **React Native**: Copy code for React Native implementation.
4. **CSS**: Copy raw `@keyframes` CSS.

## 7. Tips

- **Similar Complexity**: Morphing shapes with similar detail levels works best.
- **Direction**: Try the **Direction Swap** button if the morph looks unnatural.
- **Preview**: The live card preview shows exactly what the exported animation will look like.
