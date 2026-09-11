import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { MapCard } from "@/components/site/MapCard";
import { Section, SectionHeading } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { practiceTypes, site, vehicleOrigins } from "@/config/site";
import { buildHead } from "@/lib/seo";

type Practice = (typeof practiceTypes)[number];
type Vehicle = (typeof vehicleOrigins)[number];

const isPractice = (v: unknown): v is Practice => typeof v === "string" && (practiceTypes as readonly string[]).includes(v);
const isVehicle = (v: unknown): v is Vehicle => typeof v === "string" && (vehicleOrigins as readonly string[]).includes(v);

export const Route = createFileRoute("/contatti")({
  component: ContattiPage,
  validateSearch: (search: Record<string, unknown>): { pratica?: Practice | undefined; veicolo?: Vehicle | undefined } => ({
    pratica: isPractice(search["pratica"]) ? search["pratica"] : undefined,
    veicolo: isVehicle(search["veicolo"]) ? search["veicolo"] : undefined,
  }),
  head: () =>
    buildHead({
      title: `Contatti | ${site.name} Cesano Maderno`,
      description: `Contatta ${site.name} a Cesano Maderno: telefono ${site.phone.display}, email e modulo per richiedere informazioni su passaggi di proprietà, immatricolazioni e altre pratiche auto.`,
      path: "/contatti",
    }),
});

function ContattiPage() {
  const { pratica, veicolo } = Route.useSearch();

  return (
    <>
      <Section tone="paper" className="py-12 md:py-16">
        <SectionHeading as="h1" eyebrow="Contatti" title="Richiedi informazioni" intro="Telefona, scrivi un'email o compila il modulo: descrivi la tua situazione e l'agenzia potrà indicarti quali informazioni verificare." />
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="-mt-4 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-heading text-xl font-bold text-primary-deep">{site.name}</h2>
              <p className="text-sm text-muted-foreground">{site.sector}</p>
              <address className="mt-5 space-y-4 text-[15px] not-italic">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.city}
                    <br />
                    {site.address.country}
                  </span>
                </p>
                <p className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <a href={site.phone.href} className="font-semibold text-primary-deep hover:underline">
                    {site.phone.display}
                  </a>
                </p>
                <p className="flex gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <a href={site.email.href} className="font-semibold text-primary-deep hover:underline">
                    {site.email.display}
                  </a>
                </p>
              </address>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row lg:flex-col">
                <Button asChild>
                  <a href={site.phone.href}>{site.cta.call}</a>
                </Button>
                <Button asChild variant="outline">
                  <a href={site.maps.directionsUrl} target="_blank" rel="noopener noreferrer">
                    {site.cta.directions}
                  </a>
                </Button>
              </div>
              {/* Orari di apertura non disponibili: da inserire dopo conferma dell'agenzia. */}
              <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
                Prima di recarti in sede, ti consigliamo di telefonare per confermare le modalità di accesso.
              </p>
            </div>
            <MapCard />
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-card md:p-8">
            <h2 className="font-heading text-xl font-bold text-primary-deep">Modulo di richiesta informazioni</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Non inserire dati sensibili o copie di documenti: verranno richiesti dall'agenzia solo se necessari.
            </p>
            <div className="mt-6">
              <ContactForm defaultPractice={pratica} defaultVehicle={veicolo} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
