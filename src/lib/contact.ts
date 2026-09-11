import { z } from "zod";
import { contactChannels, practiceTypes, site, vehicleOrigins } from "@/config/site";

/**
 * Logica del form di richiesta informazioni, separata dal componente grafico.
 *
 * STATO ATTUALE: nessun servizio di invio è configurato (site.form.deliveryMode = "demo").
 * Per attivare l'invio reale:
 *  1. creare una server function (es. src/lib/contact.functions.ts) che
 *     valida con `contactSchema` e inoltra a un provider email verificato;
 *  2. impostare `site.form.deliveryMode = "server"`;
 *  3. richiamarla in `submitContact`.
 * Nessuna chiave o credenziale deve comparire nel codice client.
 */

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Inserisci nome e cognome."),
  phone: z
    .string()
    .trim()
    .min(6, "Inserisci un numero di telefono valido.")
    .regex(/^[+\d\s().-]+$/, "Il numero può contenere solo cifre, spazi e il prefisso."),
  email: z.string().trim().email("Inserisci un indirizzo email valido."),
  practiceType: z.enum(practiceTypes, { message: "Seleziona la tipologia di pratica." }),
  vehicleOrigin: z.enum(vehicleOrigins, { message: "Indica se il veicolo è nazionale o estero." }),
  originCountry: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Descrivi brevemente la tua situazione (almeno 10 caratteri).")
    .max(2000, "Il messaggio è troppo lungo."),
  preferredChannel: z.enum(contactChannels, { message: "Scegli come preferisci essere ricontattato." }),
  privacy: z.literal(true, { message: "Il consenso al trattamento dei dati è necessario." }),
  /** Honeypot: deve restare vuoto. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactData = z.infer<typeof contactSchema>;

export type SubmitResult =
  | { status: "demo"; mailto: string }
  | { status: "sent" }
  | { status: "error"; message: string };

export function buildMailto(data: ContactData): string {
  const subject = `Richiesta informazioni: ${data.practiceType}`;
  const lines = [
    `Nome e cognome: ${data.fullName}`,
    `Telefono: ${data.phone}`,
    `Email: ${data.email}`,
    `Tipologia di pratica: ${data.practiceType}`,
    `Veicolo: ${data.vehicleOrigin}`,
    data.originCountry ? `Paese di provenienza: ${data.originCountry}` : null,
    `Canale preferito: ${data.preferredChannel}`,
    "",
    data.message,
  ].filter((l): l is string => l !== null);
  return `${site.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export async function submitContact(data: ContactData): Promise<SubmitResult> {
  if (data.website) {
    // Probabile bot: si finge di accettare senza fare nulla.
    return { status: "demo", mailto: site.email.href };
  }
  if (site.form.deliveryMode === "demo") {
    return { status: "demo", mailto: buildMailto(data) };
  }
  // Punto di aggancio per la server function reale.
  return { status: "error", message: "Servizio di invio non ancora configurato." };
}
