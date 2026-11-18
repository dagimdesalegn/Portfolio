import Image from "next/image";
import { ArrowDownToLine, Github, Instagram, Linkedin, Twitter } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/dagimdesalegn", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
  { label: "X", href: "https://x.com/", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com/", icon: Instagram },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-adwa-green text-white">
      <div className="absolute inset-0 tibeb-grid-dark opacity-40" />
      <div className="hero-ring absolute -right-40 top-20 h-80 w-80 rounded-full border border-habesha-gold/20" />
      <div className="hero-ring-reverse absolute -right-20 top-40 h-80 w-80 rounded-full border border-terracotta/20" />

      <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-7 lg:grid-cols-[1fr_420px] lg:pt-36">
        <div className="hero-intro max-w-3xl">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-white/55">
            <span className="h-px w-10 bg-habesha-gold" /> Full-Stack Developer
          </div>
          <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Dagim Desalegn</h1>
          <h2 className="mt-3 font-heading text-2xl font-medium text-habesha-gold sm:text-3xl">Full-Stack Developer</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            Building thoughtful digital experiences and reliable web applications from Ethiopia, with a focus on clarity, usability, and real-world impact.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4">
            <a href="/assets/cv.pdf" download className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-habesha-gold/70 bg-habesha-gold px-5 py-3 text-sm font-bold text-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-white">
              <ArrowDownToLine size={16} /> Download CV
            </a>
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white/70 transition hover:-translate-y-1 hover:border-habesha-gold hover:bg-habesha-gold hover:text-foreground">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-portrait relative mx-auto w-full max-w-[360px]">
          <div className="absolute -inset-5 rounded-[2rem] border border-habesha-gold/25" />
          <div className="absolute -inset-2 rounded-[1.7rem] border border-terracotta/40" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] border border-habesha-gold/50 bg-white/10 shadow-2xl">
            <Image src="/profile.jpg" alt="Dagim Desalegn" fill priority className="object-cover" sizes="(max-width: 1024px) 360px, 420px" />
          </div>
        </div>
      </div>
    </section>
  );
}
