import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/config/site";

export function FaqList() {
  return (
    <Accordion type="single" collapsible className="divide-y rounded-xl border bg-card px-5 shadow-card">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`} className="border-b-0">
          <AccordionTrigger className="py-5 text-left font-heading text-[16px] font-bold text-primary-deep hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-[15px] leading-relaxed text-foreground/85">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
