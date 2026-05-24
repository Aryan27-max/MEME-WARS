# 🥊 Gen'Z – Banter Box 🥊

Welcome to **Gen'Z – Banter Box**, a high-energy, brutalist Neo-Memphis web application designed for next-generation sports fans. It merges the interactive character carousel layouts of **Stitch ToonHub** with the colorful retro templates of **Memphis design** into a real-time, responsive meme-battle arena!

The experience feels like:
**Discord + Reddit + Canva + Instagram Stories + IPL Fan Culture**

---

## ⚡ Tech Stack & Architecture
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (Pure CSS Theme Extensions)
- **Fonts**: Loaded via `next/font/google`:
  - `Russo One` (futuristic uppercase headings)
  - `Bangers` (comic-book sticker tabs, buttons, labels)
  - `Inter` (readable body copywriting)

---

## 🎨 Visual System & Guidelines
- **Brutalist Outlines**: Solid `4px` black borders on every layout block.
- **Physical Elevation**: No blurs allowed. Elevation is represented by a solid `12px` or `6px` black shadow offset that depresses physically on mouse clicks.
- **Micro-Animations**: Floating stickers, rotating tabs, CRT scanline overlays, neon pulse glowing borders, and interactive card tilts.
- **Vibrant Clashing Colors**: CMYK-adjacent neon colors: CSK yellow, RCB red, MI blue, KKR purple, and SRH orange wrapper styles.
- **Polka Density**: Subtle retro polka-dot radial patterns applied to background surfaces.

---

## 🚀 Key Features

### 1. Interactive Mascot Carousel (Landing Page `/`)
- **Stitch Character Carousel**: Staggered character slides where selecting an IPL clan mascot (e.g. RCB King Lion, CSK Crown Lion, MI Cyborg, KKR Knight, SRH Fire Eagle) changes the landing page theme.
- **Animation Transitions**: Mascot graphics scale up on hover, background patterns shift, and primary/secondary colors bleed dynamically into page wrappers.
- **Taglines & CTAs**: Direct buttons to enter match rooms or discover trending templates.

### 2. Match Discovery Feed (`/matches`)
- **Live rivalries grid**: Lists active matches (RCB vs CSK, MI vs GT, KKR vs SRH) and upcoming matches (RR vs LSG, DC vs PBKS).
- **Search & Filters**: Fully functional search inputs and filters (`ALL`, `LIVE NOW`, `UPCOMING`) built with Memphis styling.
- **Match Metrics**: Displays active online fans, live scores, and total meme count.

### 3. Live Match Room (`/match/[id]`)
- **Left Sidebar**: Renders active live score boxes, Cheer meters (vote updates cheered percentages on click), and real-time online fan registers.
- **Center Banter Feed**: Integrates both image meme posts and chat comments. Users can write quick text banter posts which append directly to the feed in real-time.
- **Right Sidebar**: Quick-load template previews that link to the studio, trending match hashtags, and an **AI Roast Engine** (generates random roasts at the click of a button).

### 4. Canvas Meme Studio (`/studio`)
- **Layered Editor Canvas**: Users can select templates, upload mascot graphics, type custom overlay text, and drag-and-drop stickers (sunglasses, crowns, fires, crying emojis).
- **Real-Time Sliders**: Adjust font size, rotation degrees, color codes, and X/Y positioning offsets on the selected layer.
- **AI Assist Panels**:
  - `AI Caption`: Rolls a funny sports punchline.
  - `AI Roast`: Outputs a savage roast to burn opponents.
  - `Remove Background`: Cutout blend tool.
  - `CRT Enhance`: Toggles vintage screen scanline overlays and neon glows.
- **Feed Integration**: Clicking `Post to Match Feed` automatically packs the canvas data, appends it into `localStorage` memory, and injects it into the Match Feed page.

### 5. Hall of Fame (`/hall-of-fame`)
- **Trophy Showrooms**: Five animated trophy cards categorizing achievements (`Meme Of Match`, `Most Viral`, `Savage Roast`, `Fan Favourite`, `AI Masterpiece`).
- **Interactive Confetti**: Clicking any trophy card triggers a simulated clapping confetti explosion with custom count track logs.

### 6. Fan Profile (`/profile`)
- **Rank Progress Bar**: Tracks level limits and XP meters.
- **Achievements list**: Displays earned badge awards like `Savage Roaster` and `Meme Machine`.
- **Personal Gallery**: Lists all memes created by the user inside the studio.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Verify Code Compilation
```bash
npm run build
```
This runs TypeScript compiler checks and compiles Next.js pages to verify production-ready code.
