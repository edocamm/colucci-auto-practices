import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

/**
 * Mappa rispettosa della privacy: nessun servizio esterno viene caricato
 * finché l'utente non lo richiede esplicitamente.
 */
export function MapCard() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-card">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[4/3]">
        {loaded ? (
          <iframe
            title={`Mappa della sede di ${site.name}`}
            src={site.maps.embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="paper-grid absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-card">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-heading text-base font-bold text-primary-deep">{site.address.street}</p>
              <p className="text-sm text-muted-foreground">
                {site.address.city}, {site.address.country}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <a href={site.maps.directionsUrl} target="_blank" rel="noopener noreferrer">
                  Apri in Google Maps <ExternalLink aria-hidden="true" />
                </a>
              </Button>
              <Button variant="outline" onClick={() => setLoaded(true)}>
                Mostra la mappa qui
              </Button>
            </div>
            <p className="max-w-xs text-[12px] leading-snug text-muted-foreground">
              La mappa interattiva viene caricata da Google solo su tua richiesta.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
