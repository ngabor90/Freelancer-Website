import { LayoutGrid, Globe, Workflow, Wrench, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/useLanguage";
import { Reveal } from "@/components/Reveal";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";

const serviceIcons = [LayoutGrid, Globe, Workflow, Wrench];

export const Services = () => {
  const { t } = useLanguage();
  const { services } = t;

  if (!services) return null;

  return (
    <section id="services" className="py-28 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mx-auto max-w-3xl mb-16">
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
              {services.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
              {services.titleLine}{" "}
              <span className="font-serif italic font-normal text-foreground">
                {services.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {services.description}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {services.items.map((service, idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            return (
              <Reveal key={idx} delay={(idx % 2) * 150} className="h-full">
                <div className="glass p-6 sm:p-8 rounded-3xl h-full flex flex-col justify-between border border-border/40 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                    {service.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-3 py-1 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="text-center mt-14 flex flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground text-sm sm:text-base">
              {services.ctaText}
            </p>
            <AnimatedBorderButton
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {services.ctaButton} <ArrowRight className="w-4 h-4 ml-1 inline" />
            </AnimatedBorderButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
