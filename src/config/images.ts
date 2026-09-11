/**
 * Immagini del sito.
 *
 * NOTA IMPORTANTE: le fotografie autentiche della sede non sono ancora state
 * fornite come file. Le immagini qui sotto sono IMMAGINI EDITORIALI
 * PROVVISORIE, neutre e prive di persone riconoscibili, targhe o documenti.
 * Non rappresentano la sede di Agenzia Colucci e vanno sostituite con:
 *  - fotografia dell'area d'attesa (2024) come immagine principale della sezione Agenzia;
 *  - dettaglio dei modellini come immagine secondaria;
 *  - eventuale nuova fotografia della facciata.
 * Le fotografie fornite dovranno essere ritagliate dalle interfacce
 * Facebook/Google Maps e private di targhe e dati leggibili.
 */
import hero1600 from "@/assets/hero-scrivania-1600.webp";
import hero800 from "@/assets/hero-scrivania-800.webp";
import modellino1600 from "@/assets/dettaglio-modellino-1600.webp";
import modellino800 from "@/assets/dettaglio-modellino-800.webp";
import bancone1600 from "@/assets/bancone-accoglienza-1600.webp";
import bancone800 from "@/assets/bancone-accoglienza-800.webp";
import consegna1600 from "@/assets/consegna-documenti-1600.webp";
import consegna800 from "@/assets/consegna-documenti-800.webp";

export type SiteImage = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  category?: string;
  provisional: boolean;
};

const make = (
  large: string,
  small: string,
  alt: string,
  extra: Partial<SiteImage> = {},
): SiteImage => ({
  src: large,
  srcSet: `${small} 800w, ${large} 1600w`,
  width: 1600,
  height: 1200,
  alt,
  provisional: true,
  ...extra,
});

export const images = {
  hero: make(
    hero1600,
    hero800,
    "Scrivania ordinata con cartelline per documenti e una chiave dell'auto",
  ),
  agenzia: make(
    bancone1600,
    bancone800,
    "Bancone di accoglienza luminoso in uno spazio dedicato ai clienti",
  ),
  gallery: [
    make(bancone1600, bancone800, "Bancone di accoglienza e spazio interno dedicato ai clienti", {
      category: "Gli spazi",
    }),
    make(modellino1600, modellino800, "Modellino d'automobile d'epoca esposto su una mensola in legno", {
      category: "Passione per l'automobile",
    }),
    make(consegna1600, consegna800, "Consegna di una cartellina di documenti allo sportello", {
      category: "L'agenzia",
    }),
    make(hero1600, hero800, "Documenti, chiave dell'auto e occhiali su una scrivania", {
      category: "L'agenzia",
    }),
  ],
} as const;
