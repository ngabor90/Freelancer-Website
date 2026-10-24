import { useLanguage } from "@/context/useLanguage";
import { Reveal } from "@/components/Reveal";

export const Experience = () => {
  const { t } = useLanguage();
  const { experience } = t;

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/4 w-96
       h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="max-w-3xl mb-16">
            <span
              className="text-secondary-foreground text-sm
             font-medium tracking-wider uppercase"
            >
              {experience.eyebrow}
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold
             mt-4 mb-6 text-secondary-foreground"
            >
              {experience.titleLine}{" "}
              <span className="font-serif italic font-normal text-foreground">
                {experience.titleHighlight}
              </span>
            </h2>

            <p className="text-muted-foreground">
              {experience.description}
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2" />
          
          <div className="space-y-12">
            {experience.items.map((exp, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="relative grid md:grid-cols-2 gap-8">
                  <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                    {exp.current && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                    )}
                  </div>

                  <div
                    className={`pl-8 md:pl-0 ${
                      idx % 2 === 0
                        ? "md:pr-16 md:text-right"
                        : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div
                      className="glass p-6 rounded-2xl border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      <span className="text-sm text-primary font-medium">
                        {exp.period}
                      </span>
                      <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mt-4">
                        {exp.description}
                      </p>
                      <div
                        className={`flex flex-wrap gap-2 mt-4 ${
                          idx % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        {exp.technologies.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground border border-border/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
