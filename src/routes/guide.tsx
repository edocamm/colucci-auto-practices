import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { Notice, Section, SectionHeading } from "@/components/site/Section";
import { guides, site } from "@/config/site";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/guide")({
  component: GuidePage,
  head: () =>
    buildHead({
      title: `Guide e aggiornamenti | ${site.name}`,
      description:
        "Contenuti informativi di Agenzia Colucci su documenti, procedure e novità relative alle pratiche automobilistiche. Requisiti da verificare caso per caso.",
      path: "/guide",
    }),
});

function GuidePage() {
  return (
    <>
      <Section tone="paper" className="py-12 md:py-16">
        <SectionHeading as="h1" eyebrow="Guide e aggiornamenti" title="Informazioni utili prima di iniziare" intro="Questa sezione ospiterà indicazioni sui documenti, spiegazioni delle procedure e comunicazioni dell'agenzia." />
      </Section>
      <Section className="pt-4 md:pt-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {guides.map((g) => (
            <article key={g.slug} id={g.slug} className="scroll-mt-28 rounded-xl border bg-card p-6 shadow-card md:p-8">
              <p className="font-heading text-[11px] font-bold uppercase tracking-wider text-accent">{g.category}</p>
              <h2 className="mt-3 font-heading text-2xl font-bold leading-snug text-primary-deep">{g.title}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-foreground/85">{g.excerpt}</p>
              {g.body?.map((section) => (
                <div key={section.heading} className="mt-5">
                  <h3 className="font-heading text-base font-bold text-primary-deep">{section.heading}</h3>
                  <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-foreground/85">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[13px] text-muted-foreground">
                    Elenco orientativo e non necessariamente completo.
                  </p>
                </div>
              ))}
              <Notice className="mt-6">{site.disclaimer}</Notice>
              <p className="mt-3 text-[13px] text-muted-foreground">{site.infoNotice}</p>
              <Button asChild className="mt-6">
                <Link to="/contatti">
                  {g.cta} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
