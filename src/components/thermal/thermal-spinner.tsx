/**
 * Loading indicator — a seam-gradient ring (ice through plasma to ember)
 * with a domain-true label. Pure CSS; the ring stops under reduced motion.
 */
export function ThermalSpinner({
  label = "warming cache…",
}: {
  label?: string;
}) {
  return (
    <output className="flex items-center gap-3">
      <span className="thermal-ring" aria-hidden />
      <span className="font-mono text-xs text-mist">{label}</span>
    </output>
  );
}
