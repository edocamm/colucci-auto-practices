import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { images, type SiteImage } from "@/config/images";

export function Picture({
  image,
  sizes,
  priority = false,
  className,
}: {
  image: SiteImage;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );
}

/** Galleria contenuta con lightbox accessibile (Dialog). */
export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const current = openIndex === null ? null : images.gallery[openIndex];
  const hasProvisional = images.gallery.some((i) => i.provisional);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {images.gallery.map((img, i) => (
          <li key={i} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block h-full w-full overflow-hidden rounded-xl bg-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Ingrandisci: ${img.alt}`}
            >
              <Picture
                image={img}
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {img.category && (
                <span className="absolute bottom-2.5 left-2.5 rounded-md bg-background/90 px-2 py-1 font-heading text-[11px] font-bold text-primary-deep backdrop-blur">
                  {img.category}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {hasProvisional && (
        <p className="mt-4 text-[13px] text-muted-foreground">
          Immagini editoriali provvisorie: verranno sostituite dalle fotografie della sede.
        </p>
      )}

      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent className="max-w-4xl overflow-hidden p-0">
          {current && (
            <>
              <DialogTitle className="sr-only">{current.alt}</DialogTitle>
              <DialogDescription className="sr-only">Immagine ingrandita</DialogDescription>
              <Picture image={current} sizes="(min-width: 1024px) 56rem, 100vw" className="h-auto w-full" />
              <p className="px-5 py-3 text-sm text-muted-foreground">{current.alt}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
