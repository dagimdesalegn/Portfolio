import { BriefcaseBusiness, CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import type { Experience as ExperienceItem } from "@/lib/content";

export default function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experience" className="site-section site-section-experience relative overflow-hidden py-20 sm:py-28">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-terracotta">Experience</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-adwa-green sm:text-4xl">Professional experience</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/55">Roles, responsibilities, and work that shaped my journey.</p>
        </div>
        {items.length > 0 && <div className="hidden h-px w-24 bg-habesha-gold/50 sm:block" />}
      </div>

      {items.length === 0 ? (
        <div className="tibeb-grid rounded-[2rem] border border-habesha-gold/30 bg-white/60 p-8 text-center shadow-tibeb">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-adwa-green text-habesha-gold"><BriefcaseBusiness size={22}/></div>
          <h3 className="mt-5 font-heading text-xl font-bold text-adwa-green">Experience will appear here</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-foreground/50">Use the private admin panel to add your experience entries.</p>
        </div>
      ) : (
        <div className="relative mx-auto grid max-w-7xl gap-5 px-5 lg:grid-cols-2 sm:px-7">
          <div className="experience-line pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-habesha-gold/0 via-habesha-gold/45 to-habesha-gold/0 lg:block" />
          {items.map((item, index) => (
            <article key={item.id} className="experience-card card-lift group relative rounded-[2rem] border border-habesha-gold/30 bg-white/80 p-1 shadow-tibeb backdrop-blur" style={{ animationDelay: `${index * 90}ms` }}>
              <div className="tibeb-grid h-full rounded-[1.75rem] bg-background/90 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-adwa-green text-habesha-gold shadow-sm">
                    <BriefcaseBusiness size={20}/>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-habesha-gold/30 bg-white/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-foreground/45">
                    {String(index + 1).padStart(2, "0")} · Experience
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="font-heading text-2xl font-bold leading-tight text-adwa-green">{item.role || "Professional role"}</h3>
                  {item.company && <p className="mt-1 font-semibold text-terracotta">{item.company}</p>}
                </div>

                {item.description && (
                  <p className="mt-5 whitespace-pre-line text-sm leading-7 text-foreground/58">{item.description}</p>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.period && <span className="inline-flex items-center gap-1.5 rounded-full border border-habesha-gold/25 bg-white/65 px-3 py-1.5 text-[10px] font-bold text-foreground/45"><CalendarDays size={12}/>{item.period}</span>}
                  {item.location && <span className="inline-flex items-center gap-1.5 rounded-full border border-habesha-gold/25 bg-white/65 px-3 py-1.5 text-[10px] font-bold text-foreground/45"><MapPin size={12}/>{item.location}</span>}
                </div>

                {item.technologies?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.technologies.map(t => <span key={t} className="rounded-full bg-adwa-green/7 px-2.5 py-1 text-[10px] font-bold text-adwa-green">{t}</span>)}
                  </div>
                ) : null}

                <div className="mt-7 flex items-center justify-between border-t border-habesha-gold/20 pt-4 text-[10px] font-black uppercase tracking-[.15em] text-foreground/30">
                  <span>Selected experience</span>
                  <ArrowUpRight size={15} className="text-terracotta transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
