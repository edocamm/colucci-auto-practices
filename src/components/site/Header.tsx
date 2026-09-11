import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Menu, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigation, site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Barra informativa */}
      <div className="hidden bg-primary-deep text-primary-foreground md:block">
        <div className="container-site flex h-9 items-center justify-between text-[13px]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 opacity-80" aria-hidden="true" />
              {site.address.inline}
            </span>
            <a href={site.phone.href} className="inline-flex items-center gap-1.5 hover:underline">
              <Phone className="size-3.5 opacity-80" aria-hidden="true" />
              {site.phone.display}
            </a>
          </div>
          <span className="font-serif text-[14px] italic tracking-wide opacity-90">{site.claim}</span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-background/95 backdrop-blur transition-[box-shadow] duration-300 supports-[backdrop-filter]:bg-background/85",
          scrolled ? "shadow-card" : "",
        )}
      >
        <div
          className={cn(
            "container-site flex items-center justify-between gap-4 transition-[height] duration-300",
            scrolled ? "h-16" : "h-[4.5rem]",
          )}
        >
          <Logo compact={scrolled} />

          <nav aria-label="Navigazione principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="rounded-md px-3 py-2 font-heading text-[14px] font-semibold text-foreground/80 transition-colors hover:bg-surface hover:text-primary-deep"
                    activeProps={{ className: "text-primary-deep bg-surface" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 rounded-md px-3 py-2 font-heading text-[14px] font-bold text-primary-deep hover:bg-surface md:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phone.display}
            </a>
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/contatti">{site.cta.primary}</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Apri il menu">
                  <Menu className="size-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-[min(100vw-2rem,22rem)] flex-col gap-0 p-0">
                <div className="border-b px-5 py-4">
                  <SheetTitle asChild>
                    <span className="block">
                      <Logo />
                    </span>
                  </SheetTitle>
                </div>
                <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto px-2 py-3">
                  <ul>
                    {navigation.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-3 py-3 font-heading text-[16px] font-semibold text-foreground hover:bg-surface"
                          activeProps={{ className: "text-primary-deep bg-surface" }}
                          activeOptions={{ exact: item.to === "/" }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="grid grid-cols-3 gap-2 border-t bg-surface px-4 py-4 pb-safe">
                  <a href={site.phone.href} className="flex flex-col items-center gap-1 rounded-md bg-background py-3 text-xs font-semibold text-primary-deep shadow-card">
                    <Phone className="size-4" aria-hidden="true" /> Chiama
                  </a>
                  <a href={site.email.href} className="flex flex-col items-center gap-1 rounded-md bg-background py-3 text-xs font-semibold text-primary-deep shadow-card">
                    <Mail className="size-4" aria-hidden="true" /> Invia email
                  </a>
                  <a href={site.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 rounded-md bg-background py-3 text-xs font-semibold text-primary-deep shadow-card">
                    <MapPin className="size-4" aria-hidden="true" /> Indicazioni
                  </a>
                  <Button asChild className="col-span-3 mt-1">
                    <Link to="/contatti" onClick={() => setOpen(false)}>
                      {site.cta.primary}
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
