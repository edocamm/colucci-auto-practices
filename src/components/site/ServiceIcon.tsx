import type { ServiceIconName } from "@/config/site";

/** Icone lineari specifiche per ciascun servizio, coerenti tra loro (24px, stroke 1.75). */
export function ServiceIcon({ name, className = "size-6" }: { name: ServiceIconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "handover":
      return (
        <svg {...common}>
          <path d="M4 14h4l3-6h4l2 4h3" />
          <path d="M5 14v4h14v-4" />
          <circle cx="8" cy="18" r="1.5" />
          <circle cx="16" cy="18" r="1.5" />
          <path d="M9 4h6m0 0-2-2m2 2-2 2" />
        </svg>
      );
    case "plate":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="10" rx="2" />
          <path d="M6 7v10" />
          <path d="M9.5 12h8M9.5 14.5h5" />
        </svg>
      );
    case "duplicate":
      return (
        <svg {...common}>
          <rect x="8" y="6" width="12" height="14" rx="2" />
          <path d="M16 6V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2" />
          <path d="M11 11h6M11 14h6M11 17h3" />
        </svg>
      );
    case "licence":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="11" r="2" />
          <path d="M5.5 16c.5-1.5 1.7-2.2 3-2.2s2.5.7 3 2.2" />
          <path d="M14 10h4M14 13h4" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M4 15.5 6 10h12l2 5.5" />
          <path d="M3 15.5h18v3H3z" />
          <path d="m9.5 13 1.8 1.8L14.8 11" />
        </svg>
      );
    case "recycle":
      return (
        <svg {...common}>
          <path d="M8 6h8l3 6h-3" />
          <path d="M5 12h3l2 3" />
          <path d="M10 15H7l-2 3h10" />
          <path d="m13 18 2 2-2 2" />
          <path d="m16 12 2-3-2-3" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16M12 4c2.5 2.8 2.5 13.2 0 16M12 4C9.5 6.8 9.5 17.2 12 20" />
          <path d="M19 19 22 22" />
        </svg>
      );
  }
}
