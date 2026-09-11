import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { Notice, Section, SectionHeading } from "@/components/site/Section";
import { howItWorks, howItWorksNote, site } from "@/config/site";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/come-funziona")({
  component: ComeFunzionaPage,
  head: () =>
    buildHead({
      title: `Come funziona | ${site.name}`,
      description:
        "Come si svolge una richiesta ad Agenzia Colucci: descrizione della situazione, verifica preliminare dei documenti, consegna della documentazione e gestione della pratica.",
      path: "/come-funziona",
    }),
});

function ComeFunzionaPage() {
  return (
    <>
      <Section tone="paper" className="py-12 md:py-16">
        <SectionHeading as="h1" eyebrow="Come funziona" title="Un percorso in quattro passaggi" intro="Dal primo contatto alla gestione della pratica: cosa aspettarsi quando ti rivolgi all'agenzia." />
      </Section>
      <Section className="pt-4 md:pt-6">
        <ol className="relative mx-auto max-w-3xl space-y-6 border-l-2 border-border pl-8">
          {howItWorks.map((step, i) => (
            <li key={step.title} className="relative rounded-xl border bg-card p-6 shadow-card">
              <span className="absolute -left-[3.05rem] top-6 grid size-9 place-items-center rounded-full bg-primary font-heading text-sm font-extrabold text-primary-foreground ring-4 ring-background">
                {i + 1}
              </span>
              <h2 className="font-heading text-xl font-bold text-primary-deep">{step.title}</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          <Notice>{howItWorksNote}</Notice>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Alcuni passaggi possono richiedere la presenza del titolare o la consegna di documenti in originale: le
            modalità vengono indicate dall'agenzia in base alla singola pratica.
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
