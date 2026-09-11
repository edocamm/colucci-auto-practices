import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Info, Mail } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactChannels, practiceTypes, site, vehicleOrigins } from "@/config/site";
import { contactSchema, submitContact, type ContactData, type SubmitResult } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Props = {
  defaultPractice?: ContactData["practiceType"] | undefined;
  defaultVehicle?: ContactData["vehicleOrigin"] | undefined;
};

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 text-[15px] text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Componente grafico del form. La validazione e l'invio vivono in src/lib/contact.ts.
 * In modalità dimostrativa non viene mostrato alcun falso messaggio di ricezione.
 */
export function ContactForm({ defaultPractice, defaultVehicle }: Props) {
  const uid = useId();
  const [result, setResult] = useState<SubmitResult | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...(defaultPractice ? { practiceType: defaultPractice } : {}),
      ...(defaultVehicle ? { vehicleOrigin: defaultVehicle } : {}),
      preferredChannel: "Telefono",
      originCountry: "",
      website: "",
    },
  });

  useEffect(() => {
    if (defaultPractice) setValue("practiceType", defaultPractice);
    if (defaultVehicle) setValue("vehicleOrigin", defaultVehicle);
  }, [defaultPractice, defaultVehicle, setValue]);

  const vehicle = watch("vehicleOrigin");
  const showCountry = vehicle === "Veicolo proveniente dall'estero" || vehicle === "Non so";

  const onSubmit = async (data: ContactData) => {
    setResult(await submitContact(data));
  };

  const field = (name: keyof ContactData) => ({
    id: `${uid}-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
  });
  const ErrorMsg = ({ name }: { name: keyof ContactData }) =>
    errors[name] ? (
      <p id={`${uid}-${name}-error`} role="alert" className="mt-1.5 text-[13px] font-medium text-destructive">
        {errors[name]?.message as string}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      {site.form.deliveryMode === "demo" && (
        <p className="flex gap-2.5 rounded-lg border bg-surface px-4 py-3 text-[13px] leading-relaxed text-foreground/80">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            Versione dimostrativa: l'invio diretto dal sito non è ancora attivo. Dopo la compilazione potrai
            inviare la richiesta con il tuo programma di posta all'indirizzo {site.email.display}.
          </span>
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${uid}-fullName`}>Nome e cognome *</Label>
          <Input {...field("fullName")} {...register("fullName")} autoComplete="name" className="mt-1.5 h-11" />
          <ErrorMsg name="fullName" />
        </div>
        <div>
          <Label htmlFor={`${uid}-phone`}>Telefono *</Label>
          <Input {...field("phone")} {...register("phone")} type="tel" autoComplete="tel" inputMode="tel" className="mt-1.5 h-11" />
          <ErrorMsg name="phone" />
        </div>
      </div>

      <div>
        <Label htmlFor={`${uid}-email`}>Email *</Label>
        <Input {...field("email")} {...register("email")} type="email" autoComplete="email" inputMode="email" className="mt-1.5 h-11" />
        <ErrorMsg name="email" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${uid}-practiceType`}>Tipologia di pratica *</Label>
          <select {...field("practiceType")} {...register("practiceType")} className={cn(selectClass, "mt-1.5")} defaultValue="">
            <option value="" disabled>
              Seleziona…
            </option>
            {practiceTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ErrorMsg name="practiceType" />
        </div>
        <div>
          <Label htmlFor={`${uid}-vehicleOrigin`}>Veicolo nazionale o estero *</Label>
          <select {...field("vehicleOrigin")} {...register("vehicleOrigin")} className={cn(selectClass, "mt-1.5")} defaultValue="">
            <option value="" disabled>
              Seleziona…
            </option>
            {vehicleOrigins.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <ErrorMsg name="vehicleOrigin" />
        </div>
      </div>

      {showCountry && (
        <div className="reveal">
          <Label htmlFor={`${uid}-originCountry`}>Paese di provenienza (se pertinente)</Label>
          <Input {...field("originCountry")} {...register("originCountry")} autoComplete="country-name" className="mt-1.5 h-11" />
          <ErrorMsg name="originCountry" />
        </div>
      )}

      <div>
        <Label htmlFor={`${uid}-message`}>Messaggio *</Label>
        <Textarea
          {...field("message")}
          {...register("message")}
          rows={5}
          className="mt-1.5 text-[15px]"
          placeholder="Descrivi brevemente la situazione: tipo di veicolo, pratica richiesta, eventuali documenti già disponibili."
        />
        <ErrorMsg name="message" />
      </div>

      <fieldset>
        <legend className="text-sm font-medium">Canale di contatto preferito *</legend>
        <div className="mt-2 flex gap-6">
          {contactChannels.map((c) => (
            <label key={c} className="inline-flex items-center gap-2 text-[15px]">
              <input type="radio" value={c} {...register("preferredChannel")} className="size-4 accent-primary" />
              {c}
            </label>
          ))}
        </div>
        <ErrorMsg name="preferredChannel" />
      </fieldset>

      {/* Honeypot: nascosto agli utenti, visibile ai bot */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Sito web</label>
        <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <Checkbox
            id={`${uid}-privacy`}
            aria-invalid={errors.privacy ? true : undefined}
            aria-describedby={errors.privacy ? `${uid}-privacy-error` : undefined}
            onCheckedChange={(v) => setValue("privacy", v === true ? true : (false as unknown as true), { shouldValidate: true })}
            className="mt-0.5"
          />
          <Label htmlFor={`${uid}-privacy`} className="text-[14px] font-normal leading-relaxed">
            Ho letto la{" "}
            <Link to="/privacy-policy" className="font-semibold text-primary-link underline-offset-2 hover:underline">
              Privacy Policy
            </Link>{" "}
            e acconsento al trattamento dei dati per rispondere alla mia richiesta. *
          </Label>
        </div>
        <ErrorMsg name="privacy" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Verifica in corso…" : "Prepara la richiesta"}
        </Button>
        <p className="text-[13px] text-muted-foreground">I campi contrassegnati con * sono obbligatori.</p>
      </div>

      <div aria-live="polite">
        {result?.status === "demo" && (
          <div className="reveal rounded-xl border border-primary/30 bg-paper p-5">
            <h3 className="font-heading text-lg font-bold text-primary-deep">Richiesta pronta per l'invio</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
              I dati sono stati controllati. L'invio automatico non è attivo in questa versione: apri il tuo
              programma di posta con il messaggio già compilato e completa l'invio a {site.email.display}, oppure
              telefona allo {site.phone.display}.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={result.mailto}>
                  <Mail aria-hidden="true" /> Apri il messaggio email
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={site.phone.href}>{site.cta.call}</a>
              </Button>
            </div>
          </div>
        )}
        {result?.status === "error" && (
          <p role="alert" className="rounded-lg border border-destructive/40 bg-paper px-4 py-3 text-sm text-destructive">
            {result.message} Puoi scrivere direttamente a{" "}
            <a href={site.email.href} className="font-semibold underline">
              {site.email.display}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
