# The Thermal Theme System

Origin uses a bespoke design language built around temperature. It visualizes interaction state across a spectrum from cold (resting) to hot (interactive), creating a dynamic and tactile user interface.

## The thermal palette

Cold colors carry the structure of the application, while heat (ember, flame) is reserved exclusively for interactive elements. The application routes interpolation through violet (plasma) to avoid murky brown gradients between blue and orange.

- **Ice tones:** `var(--color-abyss)`, `var(--color-floe)`, `var(--color-ice)` — Used for backgrounds, borders, and resting states.
- **Heat tones:** `var(--color-ember)`, `var(--color-flame)` — Used for focus rings, text selection, and hover states.
- **The Seam:** A linear gradient passing from ice to ember through plasma.

## Temperature typography

Typography is handled by the Archivo variable font, utilizing its width (`wdth`) axis to express temperature.

- **Frozen (`.type-frozen`):** Expanded, light, and widely tracked uppercase text.
- **Molten (`.type-molten`):** Condensed, black, italicized, and gradient-clipped text for intense emphasis.

## Interaction primitives

Interactive elements respond to pointer proximity and presses with visual warmth.

- **Ignite button:** The primary action. It has a dark ember core that blooms warmth where the cursor enters. Clicking casts a quick "fire" shockwave.
- **Frost button:** The secondary action. A quiet, cold surface with a crystal glint on hover. Clicking casts an "ice" shockwave.
- **Warm cards:** Cards lift and project a warm bloom toward the pointer on hover.

## View transitions

Page navigation uses the experimental native View Transitions API with a quenched/kindled animation sequence:

1. **Quench (Exit):** The outgoing page flash-freezes, blurring and desaturating.
2. **Kindle (Enter):** The incoming page rises, thaws into full clarity, and settles.
