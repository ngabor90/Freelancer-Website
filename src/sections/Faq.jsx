import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/useLanguage";
import { Reveal } from "@/components/Reveal";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";

export const Faq = () => {
  const { t } = useLanguage();
  const { faq } = t;
  const [openIndex, setOpenIndex] = useState(0);

  if (!faq) return null;

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-28 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mx-auto max-w-3xl mb-16">
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
              {faq.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
              {faq.titleLine}{" "}
              <span className="font-serif italic font-normal text-foreground">
                {faq.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {faq.description}
            </p>
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} delay={(idx + 1) * 75}>
                <div
                  className={`glass rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "border-primary/50 shadow-lg shadow-primary/5 bg-surface/80"
                      : "border-border/40 hover:border-primary/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-3 font-semibold text-base sm:text-lg text-foreground">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0 opacity-80" />
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-border/20 animate-fade-in"
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="text-center mt-14 flex flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground text-sm sm:text-base">
              {faq.ctaText}
            </p>
            <AnimatedBorderButton
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {faq.ctaButton} <ArrowRight className="w-4 h-4 ml-1 inline" />
            </AnimatedBorderButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
