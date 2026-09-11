import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { PracticeFinder } from "@/components/site/PracticeFinder";
import { Notice, Section, SectionHeading } from "@/components/site/Section";
import { ServiceCard } from "@/components/site/ServiceCard";
import { services, site } from "@/config/site";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/servizi")({
  component: ServiziPage,
  head: () =>
    buildHead({
      title: `Servizi e pratiche auto | ${site.name} Cesano Maderno`,
      description:
        "Passaggi di proprietà, immatricolazioni di veicoli nazionali e importati, duplicati, rinnovo patente, revisioni, demolizioni e radiazioni: i servizi di Agenzia Colucci.",
      path: "/servizi",
    }),
});

function ServiziPage() {
  return (
    <>
      <Section tone="paper" className="py-12 md:py-16">
        <SectionHeading as="h1" eyebrow="Servizi" title="Pratiche e servizi per il tuo veicolo" intro="Individua il servizio di cui hai bisogno e contatta l'agenzia per verificare documenti, requisiti e modalità." />
      </Section>
      <Section className="pt-4 md:pt-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <Notice className="mt-10 max-w-3xl">{site.disclaimer}</Notice>
        {/* Pagine dedicate previste: vedi futureServicePaths in src/config/site.ts */}
      </Section>
      <Section tone="surface">
        <SectionHeading eyebrow="Percorso guidato" title="Di quale pratica hai bisogno?" />
        <div className="mt-10">
          <PracticeFinder />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
