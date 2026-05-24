---
name: Neo-Banter Memphis
colors:
  surface: '#ffffff'
  surface-dim: '#e0dac7'
  surface-bright: '#fff9ea'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf3df'
  surface-container: '#f4eeda'
  surface-container-high: '#eee8d4'
  surface-container-highest: '#e9e2cf'
  on-surface: '#000000'
  on-surface-variant: '#4b4731'
  inverse-surface: '#333123'
  inverse-on-surface: '#f7f1dd'
  outline: '#7d775f'
  outline-variant: '#cec7aa'
  surface-tint: '#6b5f00'
  primary: '#6b5f00'
  on-primary: '#ffffff'
  primary-container: '#ffe400'
  on-primary-container: '#726500'
  inverse-primary: '#dfc700'
  secondary: '#a8009a'
  on-secondary: '#ffffff'
  secondary-container: '#d200c1'
  on-secondary-container: '#fffbff'
  tertiary: '#00677e'
  on-tertiary: '#ffffff'
  tertiary-container: '#b4ebff'
  on-tertiary-container: '#006e85'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fee300'
  primary-fixed-dim: '#dfc700'
  on-primary-fixed: '#201c00'
  on-primary-fixed-variant: '#504700'
  secondary-fixed: '#ffd7f1'
  secondary-fixed-dim: '#ffacea'
  on-secondary-fixed: '#390034'
  on-secondary-fixed-variant: '#840078'
  tertiary-fixed: '#b4ebff'
  tertiary-fixed-dim: '#3cd7ff'
  on-tertiary-fixed: '#001f27'
  on-tertiary-fixed-variant: '#004e5f'
  background: '#fff9ea'
  on-background: '#1e1c10'
  surface-variant: '#e9e2cf'
  background-pattern: rgba(0,0,0,0.1)
  shadow-black: '#000000'
  live-red: '#dc2626'
  csk-yellow: '#facc15'
  rcb-red: '#dc2626'
  mi-blue: '#1d4ed8'
  kkr-purple: '#581c87'
typography:
  display-lg:
    fontFamily: Russo One
    fontSize: 60px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Russo One
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.1'
  label-xl:
    fontFamily: Bangers
    fontSize: 30px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  label-lg:
    fontFamily: Bangers
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.0'
  body-bold:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  display-lg-mobile:
    fontFamily: Russo One
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.0'
spacing:
  margin-desktop: 40px
  margin-mobile: 16px
  gutter: 24px
  memphis-offset: 12px
---

## Brand & Style
The brand is loud, irreverent, and high-energy, specifically targeting Gen-Z sports fans. The style is a modern evolution of **Neo-Memphis / Maximalist Brutalism**. 

It rejects traditional UX polish in favor of raw, "lo-fi" digital aesthetics. Key characteristics include heavy black strokes, intentional misalignment (rotations), and vibrant, clashing color palettes. The goal is to evoke a "sticker-book" or "fanzine" feel that feels community-driven and chaotic rather than corporate. Visual interest is driven by "text-3d" effects, floating geometric shapes, and polka-dot patterns that break the white space.

## Colors
The palette is built on "High-Contrast CMYK-adjacent" values: Electric Yellow (Primary), Hot Pink (Secondary), and Cyan (Tertiary). 

Black (#000000) is the most critical structural color, used for all borders, shadows, and primary text to anchor the vibrant accents. Surfaces are predominantly white to maximize the "pop" of the accent colors. A "Fidelity" variant is used for team-specific identifiers (e.g., KKR Purple), allowing the brand colors to act as a wrapper around specific content colors.

## Typography
Typography is expressive and functional. **Russo One** provides a technical, sports-broadcast feel for major headlines. **Bangers** is used as a "Sticker Label" font for buttons, tags, and navigation items to inject a comic-book energy. **Inter** handles all body copy where legibility is required.

Crucial styling includes `text-3d` (dual-layered shadows) for display type and italics for a sense of motion. All display and label text should be forced uppercase.

## Layout & Spacing
The layout uses an **Orbital / Staggered Grid**. Elements do not sit perfectly on a baseline; instead, they utilize "Sticker Rotations" (typically between -3 and +6 degrees) to create a sense of organized chaos.

A standard 12-column fluid grid is used for the container, but individual cards often utilize `translate-y` offsets to break the horizontal scan line. The spacing rhythm is generous, but the "Memphis Shadow" (a 12px hard offset) must be accounted for in component spacing to prevent overlaps.

## Elevation & Depth
Depth is created through **Physicality rather than Physics**. 
- **Memphis Shadows:** No blurs are permitted. All elevation is represented by a solid 12px x 12px black offset shadow (`#000000`).
- **Borders:** Every container must have a minimum 4px solid black border. 
- **Floating Shapes:** Secondary decorative elements use a `floating-shape` animation (gentle Y-axis translation) to sit "above" the UI plane without using z-index or shadows.
- **Layering:** Components should look like they are "pasted" on top of each other, occasionally overlapping borders.

## Shapes
The shape language is strictly **Geometric and Sharp**. 
- **Corners:** 0px radius for all primary containers, buttons, and input fields.
- **Exceptions:** Perfect circles are used exclusively for "Sticker" accents, team avatars, and decorative floating elements.
- **Patterns:** Polka-dot radial gradients (15px size) are used as background textures to add "ink" density to the white surfaces.

## Components
- **Buttons:** Large, blocky, with 4px black borders. On hover, they should "lift" or change to a clashing secondary color. Use Bangers font at 24pt+.
- **Cards:** White background, 4px black border, 12px Memphis shadow. Headers often have a solid background (Primary or Secondary) with a bottom border.
- **Stickers:** Small circular or rectangular badges with high rotation (e.g., "HOT", "LIVE"). They should appear to be "stuck" on the corners of cards.
- **Inputs:** Thick borders, no focus rings (use border color change instead), and uppercase placeholder text.
- **Marquee:** The footer and news tickers must use a continuous CSS marquee animation for high-energy information density.
- **Navigation:** Navigation links are styled as independent "tabs" or stickers with varying rotations.