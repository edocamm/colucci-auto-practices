import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { localBusinessJsonLd } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-5 py-20">
      <div className="max-w-lg text-center">
        <p className="eyebrow justify-center">
          <span className="eyebrow-dot" aria-hidden="true" />
          Errore 404
        </p>
        <h1 className="mt-4 font-heading text-3xl font-extrabold text-primary-deep md:text-4xl">
          Questa pagina non è disponibile
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
          La pagina cercata potrebbe essere stata spostata oppure non esiste.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/">Torna alla home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/servizi">Consulta i servizi</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/contatti">Contatta {site.name}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-5">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-2xl font-extrabold text-primary-deep">La pagina non si è caricata</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Si è verificato un problema. Puoi riprovare oppure tornare alla home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Riprova
          </Button>
          <Button asChild variant="outline">
            <a href="/">Torna alla home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: site.seo.defaultTitle },
      { name: "description", content: site.seo.defaultDescription },
      { name: "author", content: site.name },
      { name: "theme-color", content: "#173A6B" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: site.seo.locale },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      ...(site.seo.demoNoIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&family=Source+Serif+4:ital,opsz,wght@1,8..60,400;1,8..60,500&display=swap",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd()) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Vai al contenuto
      </a>
      <Header />
      <main id="contenuto" className="mb-safe-bar">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
    </QueryClientProvider>
  );
}
