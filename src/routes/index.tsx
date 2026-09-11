import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqList } from "@/components/site/FaqList";
import { Gallery, Picture } from "@/components/site/Gallery";
import { PracticeFinder } from "@/components/site/PracticeFinder";
import { Notice, Section, SectionHeading } from "@/components/site/Section";
import { ServiceCard } from "@/components/site/ServiceCard";
import { images } from "@/config/images";
import { guides, howItWorks, howItWorksNote, services, site, values } from "@/config/site";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () =>
    buildHead({
      title: site.seo.defaultTitle,
      description: site.seo.defaultDescription,
      path: "/",
    }),
});

const quickActions = [
  { label: "Chiama l'agenzia", detail: site.phone.display, href: site.phone.href, icon: Phone, external: false },
  { label: "Invia un'email", detail: site.email.display, href: site.email.href, icon: Mail, external: false },
  { label: "Ottieni indicazioni", detail: site.address.inline, href: site.maps.directionsUrl, icon: MapPin, external: true },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="paper-grid relative overflow-hidden">
        <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div className="reveal max-w-xl">
            <p className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Pratiche automobilistiche a Cesano Maderno
            </p>
            <h1 className="mt-4 font-heading text-[2.25rem] font-extrabold leading-[1.08] text-primary-deep sm:text-5xl lg:text-[3.25rem]">
              Le tue pratiche auto, spiegate con chiarezza
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-foreground/80 md:text-lg">
              {site.name} assiste automobilisti e proprietari di veicoli nella gestione delle principali pratiche,
              dai passaggi di proprietà alle immatricolazioni.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link to="/contatti">
                  {site.cta.primary} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/servizi">{site.cta.services}</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <a href={site.phone.href} className="inline-flex items-center gap-2 font-heading font-bold text-primary-deep hover:underline">
                <Phone className="size-4" aria-hidden="true" />
                {site.cta.call}
              </a>
              <span className="font-serif text-[15px] italic text-muted-foreground">{site.claim}</span>
            </div>
          </div>

          <figure className="relative">
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <Picture
                image={images.hero}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <figcaption className="absolute -bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl border bg-background/95 px-4 py-3 shadow-card backdrop-blur sm:left-6 sm:right-auto">
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary-deep font-heading text-xs font-extrabold text-primary-foreground">
                {site.foundedYear}
              </span>
              <span className="text-sm leading-snug text-foreground/85">
                Assistenza per documenti e pratiche
                <br />
                <span className="font-semibold text-primary-deep">a {site.address.city}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* AZIONI RAPIDE */}
      <section aria-label="Azioni rapide" className="border-y bg-background">
        <div className="container-site grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {quickActions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              target={a.external ? "_blank" : undefined}
              rel={a.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 px-2 py-5 transition-colors hover:bg-surface sm:px-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <a.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-[15px] font-bold text-primary-deep">{a.label}</span>
                <span className="block truncate text-[13px] text-muted-foreground">{a.detail}</span>
              </span>
            </a>
          ))}
          <a href="#trova-la-pratica" className="group flex items-center gap-4 px-2 py-5 transition-colors hover:bg-surface sm:px-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary-deep text-primary-foreground">
              <Search className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-heading text-[15px] font-bold text-primary-deep">Trova la pratica che ti serve</span>
              <span className="block text-[13px] text-muted-foreground">Percorso guidato in pochi passaggi</span>
            </span>
          </a>
        </div>
      </section>

      {/* INTRODUZIONE */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="overflow-hidden rounded-2xl">
            <Picture image={images.agenzia} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="max-w-xl self-center">
            <SectionHeading eyebrow="L'agenzia" title="Accanto agli automobilisti dal 1987" />
            <p className="mt-6 text-[17px] leading-relaxed text-foreground/85">
              {site.name} opera a Cesano Maderno nel settore delle pratiche automobilistiche. L'attività affianca
              gli automobilisti nella gestione di documenti e procedure legate alla proprietà, alla circolazione e
              all'immatricolazione dei veicoli.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-foreground/85">
              Ogni pratica può richiedere documenti, verifiche e passaggi differenti. Per questo il servizio parte
              dall'ascolto della situazione e dall'individuazione delle informazioni necessarie.
            </p>
            <Link to="/agenzia" className="mt-6 inline-flex items-center gap-1.5 font-heading font-bold text-primary-link hover:underline">
              Conosci {site.name} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      {/* SERVIZI */}
      <Section id="servizi" tone="surface">
        <SectionHeading
          eyebrow="Servizi"
          title="Pratiche e servizi per il tuo veicolo"
          intro="Individua il servizio di cui hai bisogno e contatta l'agenzia per verificare documenti, requisiti e modalità."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
          <div className="flex flex-col justify-center rounded-xl border border-dashed border-primary/40 bg-paper p-6">
            <h3 className="font-heading text-lg font-bold text-primary-deep">Non trovi la tua pratica?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Descrivi la situazione: l'agenzia potrà indicarti se e come può assisterti.
            </p>
            <Button asChild variant="outline" className="mt-5 self-start">
              <Link to="/contatti" search={{ pratica: "Altra richiesta" }}>
                Descrivi la tua richiesta
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* TROVA LA PRATICA */}
      <Section id="trova-la-pratica" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Percorso guidato"
          title="Di quale pratica hai bisogno?"
          intro="Seleziona la situazione più vicina alla tua: riceverai un'indicazione orientativa e potrai richiedere informazioni con il modulo già impostato."
        />
        <div className="mt-10">
          <PracticeFinder />
        </div>
      </Section>

      {/* COME FUNZIONA */}
      <Section tone="paper">
        <SectionHeading eyebrow="Come funziona" title="Un percorso in quattro passaggi" />
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, i) => (
            <li key={step.title} className="relative rounded-xl border bg-card p-6 shadow-card">
              <span className="font-heading text-4xl font-extrabold text-primary/25">0{i + 1}</span>
              <h3 className="mt-3 font-heading text-lg font-bold text-primary-deep">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
        <Notice className="mt-8 max-w-2xl">{howItWorksNote}</Notice>
      </Section>

      {/* NAZIONALI E IMPORTAZIONE */}
      <Section>
        <SectionHeading
          eyebrow="Provenienza del veicolo"
          title="Immatricolazioni nazionali e veicoli d'importazione"
          intro={`Le pratiche di immatricolazione possono variare in base alla provenienza del veicolo, alla documentazione disponibile e alla situazione amministrativa. ${site.name} fornisce assistenza sia per veicoli nazionali sia per veicoli d'importazione.`}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-xl border-t-4 border-t-primary bg-card p-7 shadow-card">
            <h3 className="font-heading text-xl font-bold text-primary-deep">Veicoli nazionali</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Assistenza nella verifica e nella gestione della documentazione relativa all'immatricolazione nazionale.
            </p>
            <Link to="/contatti" search={{ pratica: "Immatricolazione nazionale", veicolo: "Veicolo nazionale" }} className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-primary-link hover:underline">
              Informazioni per veicoli nazionali <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
          <article className="rounded-xl border-t-4 border-t-primary-deep bg-card p-7 shadow-card">
            <h3 className="font-heading text-xl font-bold text-primary-deep">Veicoli d'importazione</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Supporto preliminare per individuare i documenti necessari in relazione al Paese di provenienza e alla
              situazione del veicolo.
            </p>
            <Link to="/contatti" search={{ pratica: "Immatricolazione di veicolo importato", veicolo: "Veicolo proveniente dall'estero" }} className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-primary-link hover:underline">
              Informazioni per veicoli esteri <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </Section>

      {/* GUIDE */}
      <Section tone="surface">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Guide e aggiornamenti" title="Informazioni utili prima di iniziare" />
          <Link to="/guide" className="inline-flex items-center gap-1.5 font-heading font-bold text-primary-link hover:underline">
            Tutte le guide <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {guides.map((g) => (
            <article key={g.slug} className="flex flex-col rounded-xl border bg-card p-6 shadow-card">
              <p className="font-heading text-[11px] font-bold uppercase tracking-wider text-accent">{g.category}</p>
              <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-primary-deep">{g.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{g.excerpt}</p>
              <Link to="/guide" hash={g.slug} className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-primary-link hover:underline">
                {g.cta} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-muted-foreground">{site.infoNotice}</p>
      </Section>

      {/* GALLERIA */}
      <Section>
        <SectionHeading eyebrow="Gli spazi" title="L'agenzia" intro="Uno sguardo agli ambienti in cui accogliamo automobilisti e proprietari di veicoli." />
        <div className="mt-10">
          <Gallery />
        </div>
      </Section>

      {/* VALORI */}
      <Section tone="paper">
        <SectionHeading eyebrow="Il nostro approccio" title="Un servizio costruito sulla chiarezza" intro="Ogni pratica parte dalla comprensione della situazione e dalla verifica delle informazioni disponibili." />
        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="border-l-2 border-accent pl-5">
              <h3 className="font-heading text-lg font-bold text-primary-deep">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHeading eyebrow="Domande frequenti" title="Risposte alle domande più comuni" intro="Per ogni situazione specifica, il confronto diretto con l'agenzia resta il modo più affidabile per verificare documenti e passaggi." />
            <Button asChild variant="outline" className="mt-6">
              <Link to="/faq">Tutte le domande</Link>
            </Button>
          </div>
          <FaqList />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
