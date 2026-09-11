import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  tone = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface" | "paper" | "deep";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        tone === "surface" && "bg-surface",
        tone === "paper" && "bg-paper",
        tone === "deep" && "bg-deep-gradient text-primary-foreground",
        className,
      )}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("eyebrow", onDark && "text-primary-foreground/80", align === "center" && "justify-center")}>
          <span className="eyebrow-dot" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "mt-3 font-heading text-3xl font-extrabold leading-[1.1] md:text-4xl",
          onDark ? "text-primary-foreground" : "text-primary-deep",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-4 text-[17px] leading-relaxed", onDark ? "text-primary-foreground/80" : "text-muted-foreground")}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function Notice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "rounded-lg border-l-[3px] border-accent bg-paper px-4 py-3 text-sm leading-relaxed text-foreground/85",
        className,
      )}
    >
      {children}
    </p>
  );
}
