import { Link } from "@tanstack/react-router";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark provvisorio.
 * Il file ufficiale del logo di Agenzia Colucci non è stato fornito: questo
 * componente va sostituito con il marchio originale (senza alterarne
 * proporzioni, colori e claim). La parte relativa allo "Sportello Telematico
 * dell'Automobilista" va inserita solo dopo verifica di validità e autorizzazione.
 */
export function Logo({ compact = false, onDark = false }: { compact?: boolean; onDark?: boolean }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name}, torna alla home`}
      className={cn("inline-flex items-center gap-2.5 rounded-md", onDark ? "text-primary-foreground" : "text-primary-deep")}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-md font-heading text-sm font-extrabold tracking-tight",
          onDark ? "bg-primary-foreground text-primary-deep" : "bg-primary-deep text-primary-foreground",
        )}
      >
        AC
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[17px] font-extrabold tracking-tight">{site.name}</span>
        {!compact && (
          <span className={cn("mt-1 text-[11px] font-medium tracking-wide", onDark ? "text-primary-foreground/70" : "text-muted-foreground")}>
            Pratiche automobilistiche
          </span>
        )}
      </span>
    </Link>
  );
}
