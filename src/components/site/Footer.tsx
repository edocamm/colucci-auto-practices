import { Link } from "@tanstack/react-router";
import { navigation, site } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [site.social.facebook, site.social.tiktok].filter((s) => s.url);

  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo onDark />
          <p className="mt-4 font-serif text-lg italic text-primary-foreground/85">{site.claim}</p>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">{site.shortDescription}</p>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground/70">Contatti</h2>
          <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed">
            <p>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.country}
            </p>
            <p>
              <a href={site.phone.href} className="hover:underline">
                {site.phone.display}
              </a>
            </p>
            <p>
              <a href={site.email.href} className="hover:underline">
                {site.email.display}
              </a>
            </p>
          </address>
          {socials.length > 0 && (
            <ul className="mt-4 flex gap-4 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url!} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-primary-foreground/70">Collegamenti rapidi</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-1">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Tutti i diritti riservati.
          </p>
          <p>{site.sector} · {site.address.city}</p>
        </div>
      </div>
    </footer>
  );
}
