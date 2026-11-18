"use client";

import { useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import type { GithubProject } from "@/lib/github";

function ProjectPreview({ project }: { project: GithubProject }) {
  const [src, setSrc] = useState(project.screenshot_url);

  return (
    <img
      src={src}
      alt={`${project.name} preview`}
      loading="lazy"
      onError={() => {
        if (src !== project.fallback_screenshot_url) {
          setSrc(project.fallback_screenshot_url);
        }
      }}
      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
    />
  );
}

export default function Projects({ projects }: { projects: GithubProject[] }) {
  return (
    <section id="projects" className="ethiopian-section relative mx-auto max-w-7xl px-5 py-24 sm:px-7">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">Selected work</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-adwa-green sm:text-4xl">Projects</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/55">
            A live selection of projects pulled directly from GitHub.
          </p>
        </div>
        <a href="https://github.com/dagimdesalegn?tab=repositories" target="_blank" rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-adwa-green/20 bg-white/60 px-4 py-2.5 text-xs font-bold text-adwa-green transition hover:border-terracotta/50 hover:text-terracotta">
          View GitHub <Github size={14} />
        </a>
      </div>

      {projects.length === 0 ? (
        <div className="tibeb-grid rounded-[2rem] border border-habesha-gold/30 bg-white/55 p-8 text-center shadow-tibeb">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-adwa-green text-habesha-gold">
            <Github size={23} />
          </div>
          <h3 className="mt-5 font-heading text-xl font-bold text-adwa-green">Featured projects are loading</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-foreground/55">
            Add the <span className="font-semibold text-adwa-green">portfolio-featured</span> topic to the repositories you want to showcase.
          </p>
        </div>
      ) : (
        <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article key={project.id} className={`${index % 5 === 0 ? "md:col-span-2" : ""} group relative flex min-h-[280px] flex-col overflow-hidden rounded-[1.8rem] border border-habesha-gold/30 bg-white/65 p-6 shadow-tibeb transition duration-300 hover:-translate-y-1.5 hover:border-terracotta/50 hover:shadow-[0_20px_60px_rgba(30,58,50,.13)]`}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-[1.35rem] border border-habesha-gold/20 bg-white">
                <ProjectPreview project={project} />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-adwa-green/55 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-adwa-green/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-white">Live preview</span>
              </div>
              <div className="relative mt-5 flex items-start justify-between gap-4">
                <span className="rounded-full bg-adwa-green/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-terracotta">{project.language || "Web"}</span>
                {project.stargazers_count > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/45"><Star size={13} /> {project.stargazers_count}</span>
                )}
              </div>
              <div className="relative mt-7">
                <h3 className="font-heading text-2xl font-bold text-adwa-green">{project.name}</h3>
                {project.description && <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/55">{project.description}</p>}
              </div>
              <div className="relative mt-auto pt-7">
                {project.topics?.filter((topic) => topic.trim().toLowerCase() !== "portfolio-featured").length > 0 && (
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.topics
                      .filter((topic) => topic.trim().toLowerCase() !== "portfolio-featured")
                      .map((topic) => (
                        <span key={topic} className="rounded-full border border-habesha-gold/35 bg-background/70 px-2.5 py-1 text-[10px] font-semibold text-foreground/55">{topic}</span>
                      ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.production_url && <a href={project.production_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-adwa-green px-4 py-2.5 text-xs font-bold text-white transition hover:bg-terracotta"><ExternalLink size={13} /> Live Demo</a>}
                  <a href={project.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-adwa-green/20 bg-white/60 px-4 py-2.5 text-xs font-bold text-adwa-green transition hover:border-adwa-green hover:bg-adwa-green hover:text-white"><Github size={13} /> Source Code</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
