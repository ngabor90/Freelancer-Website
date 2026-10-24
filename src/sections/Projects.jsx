import { Code, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useLanguage } from "@/context/useLanguage";
import { Reveal } from "@/components/Reveal";

export const Projects = () => {
  const { t } = useLanguage();
  const { projects } = t;

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mx-auto max-w-3xl mb-16">
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
              {projects.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
              {projects.titleLine}{" "}
              <span className="font-serif italic font-normal text-foreground">
                {projects.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground">
              {projects.description}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.items.map((project, idx) => (
            <Reveal key={idx} delay={(idx % 2) * 150} className="h-full">
              <div className="group glass rounded-2xl overflow-hidden h-full flex flex-col border-2 border-transparent hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="px-4 py-2.5 bg-surface/90 border-b border-border/50 flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div
                    className="text-xs font-mono text-muted-foreground/70 truncate px-2.5 py-0.5 rounded bg-background/60 border border-border/40"
                    style={{ maxWidth: "210px" }}
                  >
                    {project.liveUrl
                      ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                      : `${project.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.dev`}
                  </div>
                  <div className="w-8 flex justify-end">
                    {project.liveUrl && (
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </div>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="relative overflow-hidden aspect-video items-center justify-center bg-surface block cursor-pointer"
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code className="w-10 h-10 text-primary/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </a>
                ) : (
                  <div className="relative overflow-hidden aspect-video flex items-center justify-center bg-surface">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Code className="w-10 h-10 text-primary/40" />
                    )}
                  </div>
                )}

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {project.featured && (
                      <div className="flex items-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold tracking-wide">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          {projects.featuredBadge}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {projects.liveLabel}
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                          <FaGithub className="w-4 h-4" />
                          {projects.codeLabel}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="text-center mt-12">
            <AnimatedBorderButton
              onClick={() =>
                (window.location.href = "mailto:n.gabor90@gmail.com")
              }
            >
              {projects.contactMe}
            </AnimatedBorderButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
