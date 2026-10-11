---
name: Voltage Terminal
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393d'
  surface-container-lowest: '#0c0e11'
  surface-container-low: '#1a1c1f'
  surface-container: '#1e2023'
  surface-container-high: '#282a2d'
  surface-container-highest: '#333538'
  on-surface: '#e2e2e6'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e2e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#c2c6d2'
  on-secondary: '#2c313a'
  secondary-container: '#424751'
  on-secondary-container: '#b1b5c1'
  tertiary: '#ffffff'
  on-tertiary: '#21323e'
  tertiary-container: '#d2e5f5'
  on-tertiary-container: '#556774'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#dee2ee'
  secondary-fixed-dim: '#c2c6d2'
  on-secondary-fixed: '#171c24'
  on-secondary-fixed-variant: '#424751'
  tertiary-fixed: '#d2e5f5'
  tertiary-fixed-dim: '#b6c9d8'
  on-tertiary-fixed: '#0b1d29'
  on-tertiary-fixed-variant: '#374956'
  background: '#111317'
  on-background: '#e2e2e6'
  surface-variant: '#333538'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Space Mono
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Space Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Space Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  telemetry-metric:
    fontFamily: Space Mono
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
spacing:
  gutter: 1rem
  gutter-mobile: 0.5rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an ultra-refined, high-contrast engineering dark mode. Rooted in brutalist technical utility and mission-critical telemetry interfaces, it rejects decorative frivolity, ambient neon blurs, and generic SaaS gradients in favor of structural discipline, pure matte surfaces, and razor-sharp typographic telemetry.

### Visual Aesthetic & Mood
- **Disciplined Precision:** Every container, boundary, and rule exists to delineate data streams. Surfaces feel like physical matte graphite panels machined to microscopic tolerances.
- **High-Voltage Functional Accent:** The vibrant `#CCFF00` accent functions strictly as a purposeful signal (status alerts, focus indicators, active states, key readouts) rather than decorative background wash.
- **Architectural Brutalism:** Total absence of rounded corners (`0px` radius everywhere). Crisp 1px structural gridlines create an unapologetic, instrument-grade terminal aesthetic.
- **Target Audience:** Systems architects, kernel engineers, network telemetry operators, and quantitative analysts demanding dense, low-latency visual hierarchy and maximum legibility in low-light runtime environments.

## Colors

The color palette is built on strict tonal segregation: deep matte basalt grounds, crisp structural gridlines, chalk white typographic hierarchies, and a high-voltage chartreuse signal layer.

### System Palette Roles
- **Base Ground (`#0E1013`):** Pure deep matte basalt canvas. Non-reflective, absorbing light across all wide viewports.
- **Surface Elevation (`#15181E`):** Secondary container panels, terminal viewports, inspection drawers, and data cards.
- **Surface Raised (`#1B1F27`):** Elevated overlays, modal dialogues, drop-panels, and active hover tracks.
- **Structural Boundary (`#272C35`):** Razor-sharp 1px neutral rule lines, dividing headers, grids, and modules.
- **Structural Boundary Focused (`#3B4351`):** Passive hover and elevated border distinction.
- **High-Voltage Primary (`#CCFF00`):** Electric chartreuse reserved strictly for execution hooks, active toggles, cursor signals, operational statuses, and focus highlights.
- **Typographic Scale:**
  - **High-Contrast Chalk (`#F8FAFC`):** Primary headings, critical telemetry numbers, terminal command inputs.
  - **Muted Slate (`#94A3B8`):** Body instructions, column labels, secondary metrics, structural metadata.
  - **Deep Graphite (`#475569`):** Disabled states, passive timestamps, structural prefixes, and line numbers.
- **Semantic Signals:**
  - **Critical Failure:** `#FF3344` (Pure crimson, strict 1px accent or indicator light)
  - **Operational Warning:** `#FFB700` (Amber telemetry)
  - **Informational Stream:** `#00E5FF` (Cyan stream hook)

## Typography

The typographic engine balances technical authority with fixed-pitch rigor. `Space Grotesk` governs structural anchors, modular headers, and high-level section entries. `Space Mono` governs all data visualization, telemetry feeds, code execution layers, and micro-labels.

### Typographic Rules
- **Structural Text:** All section captions, telemetry labels, and status badges must be rendered in uppercase using `label-md` or `label-sm` with explicit positive letter-spacing (`+0.06em` to `+0.08em`).
- **Telemetry Readouts:** Numerical data and logs use `Space Mono` exclusively to guarantee aligned columns, fixed data tables, and deterministic character spacing.
- **Purity Over Treatment:** Zero text-shadows, glow filters, or faux-scanline treatments. Contrast between `#F8FAFC` and `#0E1013` yields immediate readability under dense information layouts.

## Layout & Spacing

The layout philosophy mirrors architectural floor plans and mechanical schematics. Elements do not float; they snap seamlessly into a structured multi-column grid divided by explicit 1px rules.

### Layout Model
- **Dense Engineering Grid:** 12-column layout on desktop (`1280px+`), collapsing to 8 columns on tablet (`768px-1279px`), and 4 columns on mobile (`<768px`).
- **Negative Space Restraint:** Spacing serves as a delimiter, never as decorative emptiness. Internal padding defaults to compact cadences (`space-sm` to `space-md`) to ensure high information density.
- **Continuous Edge Snapping:** Adjacent panes share common 1px borders (`#272C35`) rather than nested margin gaps, producing a coherent, solid multi-pane interface.

## Elevation & Depth

This design system completely renounces blur-based drop shadows, diffuse glows, and pseudo-skeuomorphic bevels. Visual hierarchy is established exclusively through surface tonal stepping and sharp 1px structural outlines.

### Architectural Hierarchy
1. **Level 0 (Canvas Base):** `#0E1013` - Background canvas, system margins, global underlay.
2. **Level 1 (Sub-Panels & Data Matrices):** `#15181E` framed by `1px solid #272C35`.
3. **Level 2 (Active Modules & Focused Cells):** `#1B1F27` framed by `1px solid #3B4351`.
4. **Level 3 (Modal Prompts & Floating Inspectors):** `#15181E` framed by `1px solid #CCFF00` with an uncompromising hard inset shadow: `box-shadow: 4px 4px 0px 0px #000000`.

### Focus & Energy Conduction
Depth is reinforced via activation rather than physical elevation. When a component gains focus, its boundary snaps instantly to `#CCFF00` with zero transition easing, signaling an live functional connection.

## Shapes

The geometric framework is strictly non-filleted: `0px` border radius across all interactive and static elements.

### Geometrical Rules
- **Zero Radius:** Buttons, inputs, modals, tooltips, notification flags, and container boundaries must enforce `border-radius: 0px`.
- **Chamfers & Angles (Optional Accents):** Decorative edge details may utilize precision 45-degree corner notches (`polygon` clips of 4px or 8px) on terminal window headers or execution triggers, reinforcing physical telemetry equipment aesthetics.

## Components

### Buttons & Triggers
- **Primary Execution Button:** Background `#CCFF00`, text `#0E1013` (bold `Space Mono`), border `1px solid #CCFF00`. Hover state: background `#E2FF4D`, text `#000000`. Active state: background `#B3E600`.
- **Secondary Structural Button:** Background `#15181E`, text `#F8FAFC`, border `1px solid #272C35`. Hover state: border `1px solid #CCFF00`, text `#CCFF00`.
- **Destructive Action:** Background `#15181E`, text `#FF3344`, border `1px solid #FF3344`. Hover state: background `#FF3344`, text `#0E1013`.

### Inputs & Terminal Fields
- **Background:** `#0E1013`.
- **Border:** `1px solid #272C35`.
- **Text:** `#F8FAFC` in `Space Mono`.
- **Placeholder:** `#475569`.
- **Active / Focus:** Border transitions directly to `1px solid #CCFF00`. A solid rectangular chartreuse block (`#CCFF00`) serves as the cursor indicator.

### Checkboxes & Radio Controls
- **Unchecked:** `14px x 14px` square (`border-radius: 0px`), background `#0E1013`, border `1px solid #272C35`.
- **Checked (Checkbox):** Solid `#CCFF00` background containing a sharp black block or inner square (`#0E1013`).
- **Checked (Radio):** Outer square `1px solid #CCFF00`, inner solid square `6px x 6px` `#CCFF00`.

### Cards & Modules
- Built on `#15181E` with a continuous `1px solid #272C35` frame.
- **Card Headers:** Visually segregated by a `border-bottom: 1px solid #272C35`, displaying an uppercase label (`label-sm`) in `#94A3B8` accompanied by an optional status beacon.

### Telemetry Badges & Chips
- Sharp rectangular capsules (`border-radius: 0px`).
- Background `#1B1F27`, border `1px solid #272C35`, typography `label-sm` in `#94A3B8`.
- **Active / Operational State:** Border `1px solid #CCFF00`, text `#CCFF00`, with a preceding square indicator (`4px x 4px`) filled with `#CCFF00`.

### Data Tables & Log Streamers
- High-density layouts with explicit horizontal borders (`1px solid #272C35`) and optional vertical rules.
- Column headers: Uppercase `Space Mono`, text `#94A3B8`, background `#0E1013`.
- Row hover: Background shifts to `#1B1F27`; selected row highlights with a `2px solid #CCFF00` left accent bar.