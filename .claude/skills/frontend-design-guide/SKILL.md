---
name: frontend-design-guide
description: Defines the visual design system for the travel expense application, including colors, typography, and styles for navigation, tables, forms, and modals. All frontend components must follow these guidelines to ensure a consistent user experience.
---

# Frontend Design Guide

This skill defines the visual design system for the travel expense application. All frontend components must follow these guidelines.

## Color Palette

Use CSS custom properties (variables) defined in the global stylesheet:

```css
:root {
  /* Navigation & primary surfaces */
  --color-nav-bg:        #1a2f4e;   /* dark navy – top navigation bar */
  --color-nav-text:      #ffffff;
  --color-nav-hover:     #243d60;

  /* Table header / section headers */
  --color-header-bg:     #4472c4;   /* steel blue */
  --color-header-text:   #ffffff;

  /* Interactive / brand color */
  --color-primary:       #0078d4;   /* Microsoft blue – primary buttons, links */
  --color-primary-hover: #006cbe;
  --color-primary-text:  #ffffff;

  /* Backgrounds */
  --color-bg-app:        #f0f0f0;   /* page/app background */
  --color-bg-surface:    #ffffff;   /* cards, modals, panels */
  --color-bg-row-alt:    #f5f8ff;   /* alternating table rows */
  --color-bg-row-hover:  #dce8f8;   /* table row hover */
  --color-bg-selected:   #cce0f5;   /* selected row / active item */

  /* Form – required / invalid fields */
  --color-field-required-bg:     #fffde7;  /* pale yellow */
  --color-field-required-border: #e0a800;
  --color-field-error-bg:        #fff0f0;
  --color-field-error-border:    #d32f2f;

  /* Status & feedback */
  --color-error:         #d32f2f;
  --color-error-light:   #fde8e8;
  --color-warning:       #e6a000;
  --color-success:       #2e7d32;

  /* Text */
  --color-text-primary:  #1a1a1a;
  --color-text-secondary:#555555;
  --color-text-muted:    #888888;
  --color-text-disabled: #aaaaaa;

  /* Borders */
  --color-border:        #cccccc;
  --color-border-light:  #e0e0e0;

  /* Shadows */
  --shadow-panel: 0 4px 16px rgba(0, 0, 0, 0.18);
  --shadow-card:  0 1px 4px  rgba(0, 0, 0, 0.10);

  /* Spacing scale (8 px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;

  /* Border radius */
  --radius-sm:  2px;
  --radius-md:  4px;
  --radius-lg:  8px;

  /* Font */
  --font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-size-xs:   11px;
  --font-size-sm:   12px;
  --font-size-base: 13px;
  --font-size-md:   14px;
  --font-size-lg:   16px;
  --font-size-xl:   20px;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold:   600;
  --line-height: 1.4;
}
```

## Typography

- **Font family:** `'Segoe UI', system-ui, -apple-system, sans-serif`
- Body text: 13 px, `var(--font-weight-normal)`
- Labels / secondary text: 12–13 px, `var(--color-text-secondary)`
- Navigation items: 13 px, uppercase, letter-spacing 0.04 em
- Section headings (inside panels): 15–16 px, `var(--font-weight-bold)`, uppercase
- Column headers: 12–13 px, `var(--font-weight-medium)`

## Top Navigation Bar

```css
.nav-bar {
  background: var(--color-nav-bg);
  color: var(--color-nav-text);
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
  gap: var(--space-5);
  font-size: var(--font-size-base);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.nav-item {
  cursor: pointer;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
}

.nav-item:hover {
  background: var(--color-nav-hover);
}
```

- Right side: user name, notification bell, keyboard icon – all in white
- Environment badge ("DEV") uses a red pill badge

## Data Grid / Table

```css
.data-grid {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-base);
}

.data-grid thead th {
  background: var(--color-header-bg);
  color: var(--color-header-text);
  padding: var(--space-2) var(--space-3);
  text-align: left;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  user-select: none;
  border-right: 1px solid rgba(255,255,255,0.2);
}

.data-grid tbody tr {
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-bg-surface);
}

.data-grid tbody tr:nth-child(even) {
  background: var(--color-bg-row-alt);
}

.data-grid tbody tr:hover {
  background: var(--color-bg-row-hover);
  cursor: pointer;
}

.data-grid tbody tr.selected {
  background: var(--color-bg-selected);
}

.data-grid td {
  padding: var(--space-2) var(--space-3);
  vertical-align: middle;
}
```

- Column headers have a drag-handle / reorder area and a 3-dot context menu (⋮) icon
- A checkbox column on the far left enables multi-select
- A toolbar above the grid contains: **+ Hinzufügen**, **Bearbeiten**, **Kopieren**, **Löschen**, **Aktualisieren** (icon + label, flat buttons)
- A grouping hint row appears below the toolbar: _"Drag a column header and drop it here to group by that column"_
- Row count and a search icon appear on the right side of the toolbar area

## Action / Toolbar Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
}

/* Primary – blue fill */
.btn-primary {
  background: var(--color-primary);
  color: var(--color-primary-text);
  border-color: var(--color-primary);
}
.btn-primary:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

/* Secondary – outlined / ghost */
.btn-secondary {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}
.btn-secondary:hover {
  background: var(--color-bg-row-alt);
}

/* Toolbar flat button (icon + label, no border in resting state) */
.btn-toolbar {
  background: transparent;
  color: var(--color-text-primary);
  border: none;
  padding: var(--space-1) var(--space-2);
}
.btn-toolbar:hover {
  background: var(--color-bg-row-alt);
}
```

- Modal footer button order: **Primary action** (e.g. "Speichern & schließen") → **Secondary** ("Speichern") → **Cancel** ("Abbrechen")

## Modal / Side Panel

The detail form opens as an overlay panel anchored to the right side of the viewport.

```css
.panel {
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-panel);
  border-radius: var(--radius-md) 0 0 var(--radius-md);
  display: flex;
  flex-direction: column;
  min-width: 480px;
  max-width: 680px;
}

.panel-header {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.panel-tabs {
  display: flex;
  gap: 0;
  padding: 0 var(--space-4);
  border-bottom: 2px solid var(--color-border-light);
}

.panel-tab {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.panel-tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.panel-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.panel-body {
  padding: var(--space-5);
  flex: 1;
  overflow-y: auto;
}

.panel-footer {
  padding: var(--space-3) var(--space-5);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
```

- Top-right corner of the panel: ▶ (navigate to detail view) and ✕ (close) icons
- The panel title repeats the entity name in uppercase

## Form Layout

Forms inside panels use a two-column grid: label on the left (~180 px fixed), input filling the right.

```css
.form-grid {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: var(--space-3) var(--space-4);
  align-items: center;
}

.form-label {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  text-align: right;
  padding-right: var(--space-3);
}

.form-input {
  width: 100%;
  height: 28px;
  padding: 0 var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

/* Required field – yellow background */
.form-input.required:not(:disabled) {
  background: var(--color-field-required-bg);
  border-color: var(--color-field-required-border);
}

/* Invalid / validation error – red border */
.form-input.invalid {
  background: var(--color-field-error-bg);
  border-color: var(--color-field-error-border);
}
```

## Validation & Errors

- Required fields get a **pale yellow background** and amber border before the user interacts
- After a failed submit attempt, required-but-empty fields switch to **red border**
- An error summary appears at the bottom of the panel footer:
  - Red triangle icon + `"Feldname ist ein Pflichtfeld!"` inline message in red
  - A pill badge: `"N Fehler – alle anzeigen ▼"` (dark red background, white text) that expands

```css
.validation-message {
  color: var(--color-error);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.error-summary-badge {
  background: var(--color-error);
  color: #fff;
  border-radius: 20px;
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}
```

## Page / Section Header

```css
.page-header {
  height: 40px;
  background: var(--color-bg-app);
  padding: 0 var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
}

.page-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-primary);
}
```

- A **Filter** toggle link (with chevron icon) appears next to the page title
- **"Filter anwenden"** button in the top-right, styled as `btn-primary`
- Element count ("30 Elemente") and a search icon on the far right

## Icons

Use lightweight SVG icons or a well-known icon library (e.g. Lucide, Tabler Icons, or Heroicons outlined). Keep icon sizes consistent:
- Navigation & toolbar: 16 × 16 px
- Inline / form: 14 × 14 px
- Status badges: 12 × 12 px

## Responsive Behavior

The layout is a **desktop-first** business application:
- Minimum supported viewport: 1024 px wide
- The side panel overlays the grid; the grid is not resized
- No mobile-specific breakpoints are required

## General Rules

1. Use **CSS custom properties** for all colors, spacing, and font sizes – never hardcode values.
2. Prefer **flat, minimal design**: subtle borders, little rounding, no gradients on interactive controls.
3. All interactive elements must have a visible `:focus-visible` outline using `var(--color-primary)`.
4. Text must meet **WCAG AA contrast** against its background.
5. German UI strings use the **formal "Sie"** form.
6. Date/number formatting follows **Austrian/German locale** (`de-AT`): `dd.MM.yyyy`, decimal comma.
