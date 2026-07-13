/**
 * Static film grain over the whole page — a whisper of texture that keeps
 * large cold surfaces from reading as flat vector fills. Pure CSS overlay,
 * no JS, no animation.
 */
export function Grain() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
