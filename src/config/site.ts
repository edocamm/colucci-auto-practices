/**
 * Configurazione centralizzata del sito di Agenzia Colucci.
 *
 * Tutti i recapiti, i testi ricorrenti, i servizi e le impostazioni SEO
 * vivono qui: i componenti leggono da questo file e non contengono
 * stringhe duplicate.
 *
 * VERIFICHE PRIMA DELLA PUBBLICAZIONE (checklist non pubblica):
 * - CAP e provincia dell'indirizzo (non disponibili, quindi omessi)
 * - Ragione sociale completa, P.IVA, PEC, REA (non disponibili, omessi)
 * - Orari di apertura (non disponibili, omessi ovunque)
 * - URL ufficiali Facebook e TikTok (non forniti: i link social restano disattivati)
 * - URL Google Maps della sede verificato (vedi `maps.directionsUrl`)
 * - Dominio definitivo e canonical (vedi `seo.siteUrl`)
 * - File ufficiale del logo (attualmente si usa un wordmark testuale)
 * - Validità e autorizzazione della dicitura "Sportello Telematico dell'Automobilista"
 * - Approvazione dei contenuti informativi sulla radiazione
 * - Servizio reale di invio del form (vedi `form.deliveryMode`)
 */

export const site = {
  name: "Agenzia Colucci",
  fullName: "Agenzia Colucci - Pratiche automobilistiche",
  sector: "Pratiche automobilistiche",
  claim: "Dal 1987 accanto agli automobilisti",
  foundedYear: 1987,
  positioning:
    "Un punto di riferimento a Cesano Maderno per orientarsi nelle pratiche automobilistiche e gestire documenti, richieste e passaggi amministrativi con maggiore chiarezza.",
  shortDescription:
    "Agenzia di pratiche automobilistiche a Cesano Maderno per passaggi di proprietà, immatricolazioni, duplicati e altri adempimenti relativi ai veicoli.",

  address: {
    street: "Via Fratelli Kennedy 1E",
    city: "Cesano Maderno",
    country: "Italia",
    countryCode: "IT",
    // CAP e provincia: da verificare, non inseriti.
    inline: "Via Fratelli Kennedy 1E, Cesano Maderno",
  },

  phone: {
    display: "0362 521642",
    href: "tel:+390362521642",
    e164: "+390362521642",
  },

  email: {
    display: "info@agenziacolucci.com",
    href: "mailto:info@agenziacolucci.com",
  },

  maps: {
    /**
     * URL di Google Maps della sede. Da sostituire con il link verificato
     * della scheda ufficiale. Nel frattempo si usa una ricerca per indirizzo,
     * che non richiede coordinate inventate.
     */
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Agenzia Colucci, Via Fratelli Kennedy 1E, Cesano Maderno"),
    /** Embed caricato solo dopo interazione dell'utente (privacy). */
    embedUrl:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("Via Fratelli Kennedy 1E, Cesano Maderno") +
      "&output=embed",
  },

  /**
   * Social: i profili risultano esistere (Facebook "Agenzia Colucci - Pratiche
   * automobilistiche", TikTok "Agenzia.Colucci") ma gli URL ufficiali non sono
   * stati forniti. Lasciare `url: null` finché non vengono verificati: i link
   * non vengono renderizzati.
   */
  social: {
    facebook: { label: "Facebook", url: null as string | null },
    tiktok: { label: "TikTok", url: null as string | null },
  },

  seo: {
    /**
     * Dominio definitivo non disponibile. Finché resta `null`, canonical e
     * og:url usano percorsi relativi e il sito è impostato su noindex.
     */
    siteUrl: null as string | null,
    demoNoIndex: true,
    defaultTitle: "Agenzia Colucci | Pratiche automobilistiche a Cesano Maderno",
    defaultDescription:
      "Agenzia Colucci assiste gli automobilisti con passaggi di proprietà, immatricolazioni, duplicati, rinnovi patente e altre pratiche auto a Cesano Maderno.",
    ogTitle: "Agenzia Colucci | Pratiche automobilistiche",
    ogDescription: "Dal 1987 accanto agli automobilisti a Cesano Maderno.",
    locale: "it_IT",
  },

  cta: {
    primary: "Richiedi informazioni",
    call: "Chiama 0362 521642",
    email: "Invia un'email",
    directions: "Ottieni indicazioni",
    services: "Scopri i servizi",
  },

  form: {
    /**
     * "demo": nessun servizio di invio configurato. Il form valida i dati e
     * propone l'invio via email (mailto) senza simulare una ricezione.
     * "server": da attivare quando è collegato un provider email reale.
     */
    deliveryMode: "demo" as "demo" | "server",
  },

  disclaimer:
    "Documenti, requisiti e procedure possono variare in base al veicolo, alla provenienza e alla situazione amministrativa. Prima di procedere, contatta Agenzia Colucci per verificare la documentazione necessaria.",
  infoNotice:
    "Contenuto informativo. Requisiti e procedure devono essere verificati in base al singolo caso e alle disposizioni applicabili.",
} as const;

export type NavItem = { label: string; to: string };

export const navigation: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Agenzia", to: "/agenzia" },
  { label: "Servizi", to: "/servizi" },
  { label: "Come funziona", to: "/come-funziona" },
  { label: "Guide", to: "/guide" },
  { label: "FAQ", to: "/faq" },
  { label: "Contatti", to: "/contatti" },
];

export type ServiceIconName =
  | "handover"
  | "plate"
  | "duplicate"
  | "licence"
  | "check"
  | "recycle"
  | "globe";

export type Service = {
  slug: string;
  /** Percorso della futura pagina dedicata. */
  futurePath: string;
  title: string;
  description: string;
  cta: string;
  icon: ServiceIconName;
  /** Valore corrispondente nel form di contatto. */
  formValue: (typeof practiceTypes)[number];
  note?: string;
};

export const services: Service[] = [
  {
    slug: "passaggi-di-proprieta",
    futurePath: "/passaggi-di-proprieta",
    title: "Passaggi di proprietà e trapassi",
    description:
      "Assistenza nella gestione del trasferimento di proprietà di un veicolo e nella verifica preliminare della documentazione necessaria.",
    cta: "Informazioni sul passaggio di proprietà",
    icon: "handover",
    formValue: "Passaggio di proprietà",
  },
  {
    slug: "immatricolazioni",
    futurePath: "/immatricolazioni",
    title: "Immatricolazioni",
    description:
      "Supporto per pratiche di immatricolazione relative a veicoli nazionali e veicoli provenienti dall'estero.",
    cta: "Informazioni sull'immatricolazione",
    icon: "plate",
    formValue: "Immatricolazione nazionale",
  },
  {
    slug: "duplicati-documenti",
    futurePath: "/duplicati-documenti",
    title: "Duplicati dei documenti",
    description:
      "Assistenza per le pratiche relative al duplicato del Certificato di Proprietà e dei documenti di circolazione.",
    cta: "Richiedi informazioni sui duplicati",
    icon: "duplicate",
    formValue: "Duplicato dei documenti",
  },
  {
    slug: "rinnovo-patente",
    futurePath: "/rinnovo-patente",
    title: "Rinnovo della patente",
    description:
      "Informazioni e assistenza relative alla procedura di rinnovo della patente, secondo requisiti e modalità da verificare.",
    cta: "Informazioni sul rinnovo",
    icon: "licence",
    formValue: "Rinnovo patente",
  },
  {
    slug: "revisioni-collaudi",
    futurePath: "/revisioni-collaudi",
    title: "Revisioni e collaudi",
    description:
      "Supporto nella gestione delle pratiche e degli adempimenti legati a revisioni e collaudi.",
    cta: "Richiedi informazioni",
    icon: "check",
    formValue: "Revisione o collaudo",
  },
  {
    slug: "demolizioni",
    futurePath: "/demolizioni",
    title: "Demolizioni",
    description:
      "Assistenza per la documentazione e gli adempimenti amministrativi collegati alla demolizione del veicolo.",
    cta: "Informazioni sulla demolizione",
    icon: "recycle",
    formValue: "Demolizione",
  },
  {
    slug: "radiazioni",
    futurePath: "/radiazioni",
    title: "Radiazione di veicoli",
    description:
      "Assistenza per situazioni relative alla radiazione in Italia di veicoli già immatricolati all'estero.",
    cta: "Verifica la tua situazione",
    icon: "globe",
    formValue: "Radiazione",
    note: "Requisiti e documenti possono variare. Contatta l'agenzia per una verifica preliminare.",
  },
];

export const practiceTypes = [
  "Passaggio di proprietà",
  "Immatricolazione nazionale",
  "Immatricolazione di veicolo importato",
  "Duplicato dei documenti",
  "Rinnovo patente",
  "Revisione o collaudo",
  "Demolizione",
  "Radiazione",
  "Non so quale pratica scegliere",
  "Altra richiesta",
] as const;

export const vehicleOrigins = [
  "Veicolo nazionale",
  "Veicolo proveniente dall'estero",
  "Non so",
  "Non pertinente",
] as const;

export const contactChannels = ["Telefono", "Email"] as const;

export type PracticeOption = {
  id: string;
  label: string;
  explanation: string;
  formValue: (typeof practiceTypes)[number];
  vehicle?: (typeof vehicleOrigins)[number];
};

export const practiceFinder: PracticeOption[] = [
  {
    id: "compravendita",
    label: "Sto acquistando o vendendo un veicolo",
    explanation:
      "In genere si tratta di un passaggio di proprietà. L'agenzia può indicare quali documenti di venditore, acquirente e veicolo verificare prima di procedere.",
    formValue: "Passaggio di proprietà",
  },
  {
    id: "immatricolare",
    label: "Devo immatricolare un veicolo",
    explanation:
      "L'immatricolazione dipende dalla provenienza del veicolo e dalla documentazione disponibile. Descrivi il caso per ricevere una prima indicazione.",
    formValue: "Immatricolazione nazionale",
    vehicle: "Veicolo nazionale",
  },
  {
    id: "estero",
    label: "Il veicolo proviene dall'estero",
    explanation:
      "Per i veicoli d'importazione documenti e passaggi variano in base al Paese di provenienza. È utile indicare il Paese e i documenti in tuo possesso.",
    formValue: "Immatricolazione di veicolo importato",
    vehicle: "Veicolo proveniente dall'estero",
  },
  {
    id: "documento",
    label: "Ho perso o danneggiato un documento",
    explanation:
      "Potrebbe trattarsi di un duplicato del Certificato di Proprietà o del documento di circolazione. L'agenzia può indicarti cosa verificare.",
    formValue: "Duplicato dei documenti",
  },
  {
    id: "patente",
    label: "Devo rinnovare la patente",
    explanation:
      "Il rinnovo segue requisiti e modalità che dipendono dalla situazione del titolare. Contatta l'agenzia per conoscere i passaggi da verificare.",
    formValue: "Rinnovo patente",
    vehicle: "Non pertinente",
  },
  {
    id: "revisione",
    label: "Devo gestire revisione o collaudo",
    explanation:
      "L'agenzia offre supporto per le pratiche e gli adempimenti collegati a revisioni e collaudi. Indica il tipo di veicolo e la scadenza.",
    formValue: "Revisione o collaudo",
  },
  {
    id: "demolizione",
    label: "Devo demolire un veicolo",
    explanation:
      "La demolizione comporta adempimenti amministrativi specifici. L'agenzia può indicare la documentazione da preparare.",
    formValue: "Demolizione",
  },
  {
    id: "radiazione",
    label: "Devo verificare una radiazione",
    explanation:
      "Se il veicolo è già immatricolato all'estero, la radiazione in Italia è un passaggio distinto. È consigliabile una verifica preliminare della situazione.",
    formValue: "Radiazione",
    vehicle: "Veicolo proveniente dall'estero",
  },
  {
    id: "nonso",
    label: "Non so quale pratica scegliere",
    explanation:
      "Descrivi brevemente la tua situazione: l'agenzia potrà indicarti quale pratica potrebbe essere pertinente e quali informazioni verificare.",
    formValue: "Non so quale pratica scegliere",
    vehicle: "Non so",
  },
];

export const howItWorks = [
  {
    title: "Spiega la situazione",
    text: "Indica il tipo di veicolo, la pratica richiesta e le informazioni principali.",
  },
  {
    title: "Verifica preliminare",
    text: "L'agenzia può indicare quali documenti verificare in relazione alla situazione descritta.",
  },
  {
    title: "Consegna della documentazione",
    text: "I documenti necessari vengono raccolti secondo le modalità comunicate dall'agenzia.",
  },
  {
    title: "Gestione della pratica",
    text: "La pratica viene seguita attraverso i passaggi previsti e le eventuali richieste degli enti competenti.",
  },
] as const;

export const howItWorksNote =
  "Tempi, documenti ed esito possono dipendere dalla tipologia della pratica e dagli enti coinvolti.";

export const values = [
  {
    title: "Esperienza",
    text: "Una presenza documentata dal 1987 nel settore delle pratiche automobilistiche.",
  },
  {
    title: "Chiarezza",
    text: "Spiegazioni comprensibili per aiutare il cliente a individuare documenti e passaggi da verificare.",
  },
  {
    title: "Precisione",
    text: "Attenzione alle informazioni e alla documentazione necessarie in relazione alla singola pratica.",
  },
  {
    title: "Vicinanza",
    text: "Un punto di contatto locale a Cesano Maderno per automobilisti e proprietari di veicoli.",
  },
] as const;

export const faqs = [
  {
    q: "Quali documenti servono per una pratica?",
    a: "Dipende dalla tipologia della pratica, dal veicolo e dalla situazione amministrativa. Contatta l'agenzia indicando il servizio richiesto per ricevere una prima indicazione sui documenti da verificare.",
  },
  {
    q: "Posso richiedere informazioni prima di recarmi in sede?",
    a: "Puoi contattare Agenzia Colucci telefonicamente, tramite email o attraverso il modulo del sito.",
  },
  {
    q: "L'agenzia gestisce veicoli provenienti dall'estero?",
    a: "Tra i servizi documentati sono presenti le immatricolazioni di veicoli d'importazione. Requisiti e documenti devono essere verificati in base al Paese di provenienza e alla situazione del veicolo.",
  },
  {
    q: "È possibile richiedere un duplicato dei documenti?",
    a: "L'agenzia offre assistenza per pratiche relative ai duplicati del Certificato di Proprietà e dei documenti di circolazione. Contatta l'agenzia per verificare la documentazione necessaria.",
  },
  {
    q: "Posso conoscere in anticipo tempi e costi?",
    a: "Tempi e costi possono variare in relazione alla pratica e agli enti coinvolti. L'agenzia potrà fornire indicazioni dopo aver esaminato le informazioni necessarie.",
  },
  {
    q: "È necessario prendere appuntamento?",
    a: "Le modalità di accesso alla sede devono essere confermate direttamente con l'agenzia. Prima di recarti sul posto puoi telefonare al numero 0362 521642.",
  },
] as const;

export type Guide = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  cta: string;
  /** Sezioni del contenuto, tutte da approvare prima della pubblicazione. */
  body?: { heading: string; items: string[] }[];
};

export const guides: Guide[] = [
  {
    slug: "radiazione-veicolo-immatricolato-estero",
    category: "Contenuto informativo",
    title: "Radiazione in Italia di un veicolo già immatricolato all'estero",
    excerpt:
      "Immatricolazione all'estero e radiazione in Italia costituiscono passaggi distinti. Prima di procedere è necessario verificare documentazione e situazione amministrativa del veicolo.",
    cta: "Richiedi una verifica preliminare",
    // Elenco ricavato da materiale informativo dell'agenzia: da approvare
    // prima della pubblicazione, non presentato come elenco completo.
    body: [
      {
        heading: "Documenti che possono essere richiesti",
        items: [
          "Documento d'identità del proprietario in Italia",
          "Carta di circolazione estera oppure dichiarazione delle autorità estere",
          "Numero di targa annotato o fotocopia del libretto italiano",
          "Autocertificazione, su modulo fornito dall'agenzia",
        ],
      },
    ],
  },
  {
    slug: "documenti-passaggio-di-proprieta",
    category: "Documenti",
    title: "Cosa preparare prima di un passaggio di proprietà",
    excerpt:
      "Una panoramica orientativa delle informazioni che l'agenzia potrebbe chiederti per impostare la verifica preliminare di un passaggio di proprietà.",
    cta: "Chiedi quali documenti verificare",
  },
  {
    slug: "veicolo-importazione-cosa-sapere",
    category: "Veicoli d'importazione",
    title: "Veicolo acquistato all'estero: da dove iniziare",
    excerpt:
      "Provenienza, documentazione disponibile e situazione amministrativa influiscono sull'immatricolazione. Un primo confronto aiuta a capire i passaggi.",
    cta: "Descrivi il tuo caso",
  },
];

export const futureServicePaths = [
  "/passaggi-di-proprieta",
  "/immatricolazioni",
  "/veicoli-importazione",
  "/duplicati-documenti",
  "/rinnovo-patente",
  "/revisioni-collaudi",
  "/demolizioni",
  "/radiazioni",
] as const;
