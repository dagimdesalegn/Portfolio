<<<<<<< HEAD
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function About({ content }: { content: { eyebrow: string; title: string; body: string } }) {
  const paragraphs = content.body.split(/\
\\s*\
/).filter(Boolean);

  return (
    <section id="about" className="ethiopian-section relative mx-auto max-w-7xl px-5 py-20 sm:px-7 sm:py-28">
      <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
        <div className="about-reveal flex flex-col justify-between rounded-[2rem] border border-habesha-gold/30 bg-adwa-green p-7 shadow-tibeb sm:p-9">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-habesha-gold/35 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-habesha-gold">
              <Sparkles size={12} /> {content.eyebrow}
            </span>
            <h2 className="mt-6 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.7rem]">
              {content.title}
            </h2>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/45">
            <span>Thoughtful work. Useful products.</span>
            <ArrowUpRight size={18} className="text-habesha-gold" />
          </div>
        </div>

        <div className="about-reveal about-card rounded-[2rem] border border-habesha-gold/30 bg-white/75 p-7 shadow-tibeb sm:p-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-terracotta" />
            <span className="text-[10px] font-black uppercase tracking-[.2em] text-terracotta">A little about me</span>
          </div>
          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[15px] leading-8 text-foreground/65 sm:text-base sm:leading-8">
                {paragraph}
              </p>
            ))}
          </div>
=======
export default function About({ content }: { content: { eyebrow: string; title: string; body: string } }) {
  return (
    <section id="about" className="ethiopian-section relative mx-auto max-w-7xl px-5 py-20 sm:px-7 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">{content.eyebrow}</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-adwa-green sm:text-4xl">{content.title}</h2>
        </div>
        <div className="tibeb-grid rounded-[1.8rem] border border-habesha-gold/30 bg-white/60 p-7 shadow-tibeb sm:p-9">
          <p className="text-base leading-8 text-foreground/65">{content.body}</p>
>>>>>>> 3fda8ab8b1b004db546e42b4aa9fe66d77f12abd
        </div>
      </div>
    </section>
  );
}
