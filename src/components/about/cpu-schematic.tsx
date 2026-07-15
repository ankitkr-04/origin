export function CpuSchematic() {
  return (
    <div
      className="absolute -right-24 top-12 -z-10 w-96 h-96 opacity-10 pointer-events-none hidden lg:block select-none"
      aria-hidden
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        className="w-full h-full text-ice/40"
        stroke="currentColor"
      >
        <title>CPU Registry Map Schematic</title>
        <rect x="10" y="10" width="45" height="15" rx="1.5" strokeWidth="1" />
        <text
          x="15"
          y="20"
          fontSize="5"
          fontFamily="monospace"
          fill="currentColor"
        >
          RAX: 0x00FF8C
        </text>

        <rect x="10" y="30" width="45" height="15" rx="1.5" strokeWidth="1" />
        <text
          x="15"
          y="40"
          fontSize="5"
          fontFamily="monospace"
          fill="currentColor"
        >
          RBX: 0x1A2F69
        </text>

        <rect x="10" y="50" width="45" height="15" rx="1.5" strokeWidth="1" />
        <text
          x="15"
          y="60"
          fontSize="5"
          fontFamily="monospace"
          fill="currentColor"
        >
          RSP: 0x7FFF00
        </text>

        <path d="M55 17 H100 V95 H130" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M55 37 H85 V125 H130" strokeWidth="1" />
        <path d="M55 57 H70 V155 H130" strokeWidth="1" />

        <text
          x="135"
          y="85"
          fontSize="5"
          fontFamily="monospace"
          fill="currentColor"
        >
          TLB / PAGE TRANSLATION
        </text>
        <rect x="130" y="90" width="60" height="20" rx="1.5" strokeWidth="1" />
        <text
          x="135"
          y="102"
          fontSize="4.5"
          fontFamily="monospace"
          fill="currentColor"
        >
          VPN 0x0A → PPN 0x82
        </text>

        <rect x="130" y="120" width="60" height="20" rx="1.5" strokeWidth="1" />
        <text
          x="135"
          y="132"
          fontSize="4.5"
          fontFamily="monospace"
          fill="currentColor"
        >
          VPN 0x0B → PPN 0x14
        </text>

        <rect x="130" y="150" width="60" height="20" rx="1.5" strokeWidth="1" />
        <text
          x="135"
          y="162"
          fontSize="4.5"
          fontFamily="monospace"
          fill="currentColor"
        >
          VPN 0x0C → PPN 0xEE
        </text>

        <circle cx="32" cy="120" r="15" strokeWidth="1" strokeDasharray="3,1" />
        <text
          x="32"
          y="122"
          fontSize="4.5"
          fontFamily="monospace"
          textAnchor="middle"
          fill="currentColor"
        >
          NUMA CORE
        </text>
      </svg>
    </div>
  );
}
