import { Link } from "@tanstack/react-router";
import { Mail, MessageSquareText, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** Barra azioni inferiore su smartphone; si nasconde quando un campo è attivo (tastiera aperta). */
export function MobileBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isField = (el: Element | null) =>
      !!el && ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
    const onFocusIn = (e: FocusEvent) => setHidden(isField(e.target as Element));
    const onFocusOut = () => setHidden(false);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const itemClass =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2 font-heading text-[11px] font-bold text-primary-deep";

  return (
    <nav
      aria-label="Azioni rapide"
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur transition-transform duration-300 md:hidden pb-safe",
        hidden && "translate-y-full",
      )}
    >
      <div className="flex h-[4.25rem] items-stretch">
        <a href={site.phone.href} className={itemClass}>
          <Phone className="size-5" aria-hidden="true" />
          Chiama
        </a>
        <a href={site.email.href} className={cn(itemClass, "border-x")}>
          <Mail className="size-5" aria-hidden="true" />
          Email
        </a>
        <Link to="/contatti" className={cn(itemClass, "bg-primary text-primary-foreground")}>
          <MessageSquareText className="size-5" aria-hidden="true" />
          Informazioni
        </Link>
      </div>
    </nav>
  );
}
