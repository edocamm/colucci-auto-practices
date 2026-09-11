import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqList } from "@/components/site/FaqList";
import { Section, SectionHeading } from "@/components/site/Section";
import { site } from "@/config/site";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () =>
    buildHead({
      title: `Domande frequenti | ${site.name}`,
      description:
        "Risposte alle domande più comuni su documenti, veicoli esteri, duplicati, tempi, costi e modalità di contatto con Agenzia Colucci a Cesano Maderno.",
      path: "/faq",
    }),
});

function FaqPage() {
  return (
    <>
      <Section tone="paper" className="py-12 md:py-16">
        <SectionHeading as="h1" eyebrow="FAQ" title="Domande frequenti" intro="Per ogni situazione specifica, il confronto diretto con l'agenzia resta il modo più affidabile per verificare documenti e passaggi." />
      </Section>
      <Section className="pt-4 md:pt-6">
        <div className="mx-auto max-w-3xl">
          <FaqList />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
