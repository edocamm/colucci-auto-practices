import { createFileRoute } from "@tanstack/react-router";
import { Notice, Section, SectionHeading } from "@/components/site/Section";
import { site } from "@/config/site";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPage,
  head: () =>
    buildHead({
      title: `Privacy Policy | ${site.name}`,
      description: "Informativa sul trattamento dei dati personali raccolti tramite il sito di Agenzia Colucci.",
      path: "/privacy-policy",
    }),
});

/**
 * BOZZA PROVVISORIA. Prima della pubblicazione occorre completare con:
 * titolare del trattamento (ragione sociale, indirizzo, contatti), base
 * giuridica dettagliata, tempi di conservazione, eventuali responsabili
 * esterni (provider email/hosting), diritti dell'interessato e riferimenti
 * normativi verificati da un consulente.
 */
function PrivacyPage() {
  return (
    <>
      <Section tone="paper" className="py-12 md:py-16">
        <SectionHeading as="h1" eyebrow="Privacy" title="Privacy Policy" intro="Informativa sul trattamento dei dati personali raccolti attraverso questo sito." />
      </Section>
      <Section className="pt-4 md:pt-6">
        <div className="prose-custom mx-auto max-w-3xl space-y-8 text-[16px] leading-relaxed text-foreground/85">
          <Notice>
            Documento provvisorio: il testo definitivo, comprensivo dei dati del titolare del trattamento e dei tempi
            di conservazione, sarà completato prima della pubblicazione del sito.
          </Notice>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-deep">Titolare del trattamento</h2>
            <p className="mt-2">
              Il titolare del trattamento è {site.name}, con sede in {site.address.inline}. Per qualsiasi richiesta
              relativa ai dati personali è possibile scrivere a{" "}
              <a href={site.email.href} className="font-semibold text-primary-link hover:underline">
                {site.email.display}
              </a>{" "}
              oppure telefonare allo {site.phone.display}.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-deep">Dati raccolti</h2>
            <p className="mt-2">Attraverso il modulo di richiesta informazioni possono essere raccolti:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>nome e cognome;</li>
              <li>numero di telefono e indirizzo email;</li>
              <li>tipologia di pratica e informazioni sul veicolo;</li>
              <li>Paese di provenienza del veicolo, se indicato;</li>
              <li>contenuto della richiesta e canale di contatto preferito;</li>
              <li>eventuali ulteriori dati relativi alla pratica comunicati volontariamente.</li>
            </ul>
            <p className="mt-2">
              Si raccomanda di non inserire nel modulo copie di documenti o dati non necessari: la documentazione
              utile alla pratica verrà richiesta dall'agenzia secondo le modalità concordate.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-deep">Finalità e base giuridica</h2>
            <p className="mt-2">
              I dati sono trattati per rispondere alla richiesta di informazioni e, se del caso, per svolgere le
              attività preliminari alla gestione della pratica. La base giuridica è l'esecuzione di misure
              precontrattuali richieste dall'interessato e il consenso espresso tramite il modulo.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-deep">Conservazione e comunicazione</h2>
            <p className="mt-2">
              I dati sono conservati per il tempo necessario a gestire la richiesta e gli eventuali obblighi
              conseguenti. I tempi specifici di conservazione e gli eventuali soggetti terzi coinvolti saranno
              indicati nella versione definitiva di questa informativa.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-deep">Cookie e servizi di terze parti</h2>
            <p className="mt-2">
              Il sito non utilizza cookie di profilazione. La mappa interattiva di Google Maps viene caricata soltanto
              su richiesta esplicita del visitatore; in tal caso si applicano le condizioni del fornitore del
              servizio.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-deep">Diritti dell'interessato</h2>
            <p className="mt-2">
              È possibile richiedere l'accesso, la rettifica, la cancellazione o la limitazione del trattamento dei
              propri dati, nonché opporsi al trattamento, contattando il titolare ai recapiti indicati.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
