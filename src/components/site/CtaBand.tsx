import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { Section } from "./Section";

export function CtaBand() {
  return (
    <Section tone="deep">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-extrabold leading-tight md:text-4xl">
          Hai bisogno di assistenza per una pratica auto?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-primary-foreground/85">
          Descrivi brevemente la tua situazione. {site.name} potrà indicarti quali informazioni verificare e quali
          passaggi possono essere necessari.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="onDark">
            <Link to="/contatti">
              {site.cta.primary} <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="onDarkOutline">
            <a href={site.phone.href}>{site.cta.call}</a>
          </Button>
        </div>
        <a href={site.email.href} className="mt-5 inline-block text-sm font-semibold underline-offset-4 hover:underline">
          {site.cta.email}: {site.email.display}
        </a>
      </div>
    </Section>
  );
}
