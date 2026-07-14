# The Thermal Theme System

Origin uses a bespoke design language called "Thermal" that builds upon the physics of temperature. By associating cold states with resting structure and hot states with interaction, the system grounds the UI in a physical reality.

## The law of thermodynamics

Cold is the resting state; heat is attention. Approximately 95% of the interface remains cold. Fire appears exclusively during interaction, such as hovers, presses, focus states, progress indicators, or live status updates. 

Timing is purposefully asymmetric to mimic physics:
- **Ignition** is fast (~180ms)
- **Cooling** is slow (~450ms)

## The thermal palette

Fire is the primary accent for buttons, CTAs, and key hovers. Ice is used sparingly for hairline borders, monospace readouts, and structural tints. 

| Token | Hex | Role |
|---|---|---|
| `void` | `#04070d` | Deep background |
| `abyss` | `#0a1120` | Surface background |
| `floe` | `#101a2c` | Raised surface |
| `polar` | `#eaf3ff` | Primary text |
| `ice` | `#7dd3fc` | Cold interactive tint |
| `plasma` | `#c084fc` | Transition color |
| `ember` | `#ff6b3d` | Primary heat accent |
| `flame` | `#ffb454` | Secondary heat accent |

**The Seam:** A core linear gradient passing from ice to ember. It explicitly routes through violet (`plasma`) to avoid generating a muddy orange-blue interpolation.

## Temperature typography

The system uses three fonts: **Archivo** for display and headings, **Geist** for body copy, and **Geist Mono** for telemetry readouts. Archivo is a variable font configured across two thermal phases using its width (`wdth`) and weight axes:

- **Frozen (`.type-frozen`):** Expanded width (125%), light weight (~215), and wide tracking (0.13em) in uppercase.
- **Molten (`.type-molten`):** Condensed width (62%), heavy weight (850), italicized, and masked with an ember gradient for intense emphasis. Use a maximum of one molten phrase per screen.

## Motion grammar and transitions

Animations reinforce the thermal concept by utilizing spell-cast motifs and physical transitions.

- **Page transitions:** Navigating quenches the outgoing page (blurring and desaturating over 400ms) and kindles the incoming page (thawing and brightening over 650ms).
- **Modals:** Igniting open creates a warm inner flare that settles into a frost border. Closing freezes the modal shut in 240ms.
- **Buttons:** The primary **Ignite** button features a dark ember core that blooms warmth on hover. Clicking triggers a quick "fire" shockwave with sparks. The secondary **Frost** button casts an "ice" shockwave with crystal sparks.
- **Links:** Inline links feature a melt-underline interaction.

## Interactive 3D and blueprints

The design system is extended into ambient layers and 3D scenes to provide technical grounding.

- **3D Canvas:** The homepage features the "Glass Shards Core Array," a fire and ice shard field with data packets. The contact page uses a Torus-Knot "Strata" ribbon.
- **SVG Blueprints:** Backgrounds feature faint, high-precision vector overlays like an LSM-Tree compaction blueprint or CPU schematic.
- **Loaders:** The system avoids Next.js route-level loading templates to prevent clashing with view transitions. It uses dynamic domain telemetry loaders (e.g., `FLUSHING MEMTABLE...`) with frost-blue shimmers instead of standard gray skeletons.
