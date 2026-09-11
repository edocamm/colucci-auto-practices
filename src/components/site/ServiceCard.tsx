import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/config/site";
import { ServiceIcon } from "./ServiceIcon";

/**
 * Scheda servizio. Le pagine dedicate (service.futurePath) non esistono
 * ancora: la CTA porta al form di contatto già precompilato con la pratica.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex flex-col rounded-xl border bg-card p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <span className="grid size-12 place-items-center rounded-lg bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <ServiceIcon name={service.icon} />
      </span>
      <h3 className="mt-5 font-heading text-lg font-bold text-primary-deep">{service.title}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">{service.description}</p>
      {service.note && <p className="mt-3 text-[13px] leading-snug text-foreground/70">{service.note}</p>}
      <Link
        to="/contatti"
        search={{ pratica: service.formValue }}
        className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-primary-link hover:underline"
      >
        {service.cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </article>
  );
}
