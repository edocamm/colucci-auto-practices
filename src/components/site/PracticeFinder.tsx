import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { practiceFinder, site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Selettore guidato: nessun calcolo di prezzi o tempi, solo orientamento e invito al contatto. */
export function PracticeFinder() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = practiceFinder.find((p) => p.id === selectedId) ?? null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
      <fieldset className="grid gap-2 sm:grid-cols-2">
        <legend className="sr-only">Seleziona la situazione che ti riguarda</legend>
        {practiceFinder.map((option) => {
          const active = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedId(option.id)}
              className={cn(
                "flex min-h-14 items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 text-left font-heading text-[15px] font-semibold text-foreground transition-colors hover:border-primary hover:bg-surface",
                active && "border-primary bg-surface text-primary-deep ring-1 ring-primary",
              )}
            >
              {option.label}
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full border",
                  active ? "border-primary bg-primary text-primary-foreground" : "border-input",
                )}
              >
                {active && <Check className="size-3" />}
              </span>
            </button>
          );
        })}
      </fieldset>

      <div aria-live="polite" className="rounded-xl border bg-paper p-6 md:p-8">
        {selected ? (
          <div className="reveal" key={selected.id}>
            <p className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Indicazione orientativa
            </p>
            <h3 className="mt-3 font-heading text-xl font-bold text-primary-deep">{selected.formValue}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{selected.explanation}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              Questa indicazione è orientativa e non sostituisce la verifica dell'agenzia sulla singola pratica.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link
                  to="/contatti"
                  search={{ pratica: selected.formValue, veicolo: selected.vehicle }}
                >
                  {site.cta.primary}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={site.phone.href}>{site.cta.call}</a>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-heading text-xl font-bold text-primary-deep">Seleziona la tua situazione</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Scegli la voce più vicina al tuo caso: ti indicheremo quale pratica potrebbe essere pertinente e
              potrai richiedere informazioni con il modulo già precompilato.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
