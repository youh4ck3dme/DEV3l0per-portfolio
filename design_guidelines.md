# ./d3v3l0p3r - Brutalist PWA Design Guidelines

## Design Philosophy
"Digital Brutalism" - Raw code aesthetic meets high-fashion luxury. Terminal aesthetics with Awwwards-level micro-interactions. The digital structure is exposed and celebrated, not hidden. This is a boot sequence, not just a website.

## Color System: "Obsidian Zen"

**Background & Surfaces:**
- Primary Background: #030303 (Rich Black - deep void that absorbs light)
- Surface: #0A0A0A with subtle noise texture overlay for tactile quality
- Borders: 1px solid rgba(255, 255, 255, 0.08) - ultra-thin, razor-sharp edges
- NO border-radius anywhere - pure 90° angles

**Text Hierarchy:**
- Primary Text: #EDEDED (high contrast)
- Secondary Text: #888888 (technical descriptions, metadata)
- Meta Text: #444444 (grid numbers, version info)

**Accents:**
- Primary: rgba(255, 255, 255, 0.9) for critical elements
- Terminal Green: #00FF00 - use sparingly for loading bars, cursors, and status indicators only

## Typography: Swiss/Mono System

**Font Stack:**
- UI/Readability: Inter
- Code/Data/Technical: JetBrains Mono

**Heading Treatment:**
- Massive scale with tight tracking (-0.03em)
- Must dominate space architecturally
- Viewport-width typography for hero (./d3v3l0p3r)

**Micro-copy:**
- UPPERCASE with wide tracking (0.2em)
- Use for navigation, labels, technical notes

## Visual Effects & Textures

**Permanent Overlays:**
- Film grain/noise: SVG filter overlay across entire app to eliminate digital sterility
- Spotlight: Radial gradients following mouse cursor, revealing underlying grid structure

**Interactive States:**
- Chromatic aberration (RGB shift) on hover - subtle, reactive, not random
- No soft shadows or glows - all effects sharp and mechanical

## Animation Physics (Framer Motion)

**Timing:**
- Duration: 0.4s
- Easing: circOut
- Sharp, authoritative entrances - no slow fade-ins

**Scroll Behavior:**
- Smooth scroll using Lenis
- Parallax for images/sections with varying "weight"
- Elements have different scroll speeds to create depth

**Loading State (CRITICAL):**
- Custom boot sequence preloader
- Shows ./dev or dev. initials
- Blinking terminal cursor
- Text scramble/decode effect
- Mechanical progress bar (jumps, not linear smoothness)
- This is system initialization, not passive waiting

**Progress Indicators:**
- Everywhere something processes: sharp, mechanical progress bars
- border-radius: 0 always
- OS-level visual language

## Card Scanner Footer

**Structure:**
- Infinite horizontal scroll of 5 developer-themed credit cards
- Central cyan/blue scanner beam (Canvas 2D with glow)
- Three.js particle system background (floating behind cards)

**The 5 Cards (CSS gradients, not images):**

1. **"The Excuse"** - Blue/Dark Blue gradient
   - LOCALHOST_BANK
   - HTTP 200 404 500 418
   - WORKS ON MY MACHINE
   - WHEN_DEPLOYED

2. **"Git Struggle"** - Dark Gray/Black gradient
   - GIT_COMMIT_LTD
   - a1b2 c3d4 e5f6 HEAD
   - MERGE CONFLICT SURVIVOR
   - FORCE_PUSH

3. **"Tech Stack"** - Purple/Cyan gradient
   - REACT_NATIVE_UNION
   - USE EFFECT HOOK ARRAY
   - COMPONENT ARCHITECT
   - V 18.2.0

4. **"Caffeine"** - Gold/Brown gradient
   - CAFFEINE_OS
   - C0FF EE00 DEAD BEEF
   - CODE GENERATOR
   - 03:00 AM

5. **"Hire Me"** - Green/Black gradient
   - OPEN_TO_WORK
   - [Phone number format]
   - YOUR FUTURE SENIOR DEV
   - ASAP

**Scanner Effect:**
- When card passes under beam: normal visual clips away
- ASCII matrix code version reveals using clip-path masking
- Monospace font for ASCII matrix effect

**Footer Bottom:**
- Social links (minimal, monospace styled)
- Copyright in technical format

## PWA Features

**Offline-First:**
- Full functionality without network
- Status indicator: Terminal messages "SYSTEM OFFLINE / LOCAL MODE ACTIVE"
- Accent color shift when offline

**Install Prompt:**
- Custom styled as terminal command (cmd+i aesthetic)
- Only appears if not installed
- System-level visual treatment

**Mobile Enhancements:**
- Haptic feedback on tap/long-press (navigator.vibrate)
- Gyroscope parallax on Bento Grid cards
- Visual micro-shakes for feedback

**Transitions:**
- View Transitions API for native page changes
- No white flashes between routes

## Layout & Components

**Navigation:**
- Floating Dynamic Island/Dock
- Context-responsive (expands on hover, shows metadata)
- Sections: Home, Projects, About, Cloud, Developers, Contact

**Hero Section:**
- ./d3v3l0p3r as massive, abstract viewport-width element
- Terminal aesthetic dominance

**Content Grid:**
- Bento Grid layout with strict alignment
- Cards respond to device tilt (mobile gyroscope)
- Virtual light reflection effects

## Spacing System
Use Tailwind units: 2, 4, 8, 16, 24, 32 for consistent rhythm throughout brutal grid structure.

## Images
No large hero images - this is a terminal/code-first aesthetic. Three.js particles and typographic dominance create visual impact. Card scanner uses CSS gradients, not image assets.