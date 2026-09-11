import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { Gallery, Picture } from "@/components/site/Gallery";
import { Section, SectionHeading } from "@/components/site/Section";
import { images } from "@/config/images";
import { site, values } from "@/config/site";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/agenzia")({
  component: AgenziaPage,
  head: () =>
    buildHead({
      title: `L'agenzia | ${site.name}, dal 1987 a Cesano Maderno`,
      description:
        "Agenzia Colucci opera a Cesano Maderno dal 1987 nel settore delle pratiche automobilistiche, affiancando gli automobilisti nella gestione di documenti e procedure.",
      path: "/agenzia",
    }),
});

const benefits = [
  "Una persona a cui spiegare la propria situazione",
  "Indicazioni preliminari sui documenti da preparare",
  "Supporto nell'individuazione della pratica corretta",
  "Aggiornamenti chiari sui passaggi da seguire",
  "Un contatto locale a Cesano Maderno",
  "Servizi per veicoli nazionali e d'importazione",
];

function AgenziaPage() {
  return (
    <>
      <Section tone="paper" className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading as="h1" eyebrow="L'agenzia" title="Accanto agli automobilisti dal 1987" />
            <p className="mt-6 text-[17px] leading-relaxed text-foreground/85">{site.positioning}</p>
            <p className="mt-4 text-[17px] leading-relaxed text-foreground/85">
              {site.name} opera a Cesano Maderno nel settore delle pratiche automobilistiche. L'attività affianca gli
              automobilisti nella gestione di documenti e procedure legate alla proprietà, alla circolazione e
              all'immatricolazione dei veicoli.
            </p>
            <p className="mt-6 font-serif text-2xl italic text-primary-deep">{site.claim}</p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lift">
            {/* Sostituire con la fotografia dell'area d'attesa (2024), ritagliata dall'interfaccia Google Maps. */}
            <Picture image={images.agenzia} priority sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="Cosa significa rivolgersi a noi" title="Un interlocutore per orientarsi tra documenti e passaggi" intro="Ogni pratica può richiedere documenti, verifiche e passaggi differenti. Per questo il servizio parte dall'ascolto della situazione e dall'individuazione delle informazioni necessarie." />
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-lg border bg-card p-4 text-[15px] leading-snug shadow-card">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="I nostri principi" title="Esperienza, chiarezza, precisione, vicinanza" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="rounded-xl border bg-card p-6 shadow-card">
              <h3 className="font-heading text-lg font-bold text-primary-deep">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Gli spazi" title="La sede a Cesano Maderno" intro={`${site.address.inline}. Prima di recarti sul posto puoi telefonare allo ${site.phone.display}.`} />
        <div className="mt-10">
          <Gallery />
        </div>
        <Link to="/contatti" className="mt-8 inline-flex items-center gap-1.5 font-heading font-bold text-primary-link hover:underline">
          Come raggiungerci <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Section>

      <CtaBand />
    </>
  );
}
