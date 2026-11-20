import Image from "next/image";
import { ArrowUpRight, Github, Instagram, Linkedin, Twitter } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/dagimdesalegn", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dagimdesu/", icon: Linkedin },
  { label: "X", href: "https://x.com/dagim__desalegn/", icon: Twitter },
  { label: "Instagram", href: "https://www.instagram.com/dagiiyo/", icon: Instagram },
];

const navigation = [
  ["Home", "#top"],
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Certificates", "#certificates"],
  ["Contact", "#contact"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-habesha-gold/30 bg-adwa-green text-white">
      <div className="absolute inset-0 tibeb-grid-dark opacity-30" />
      <div className="absolute -right-32 top-0 h-72 w-72 rounded-full border border-habesha-gold/10" />
      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-7 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_.7fr_.7fr] lg:gap-14">
          <div className="footer-reveal">
            <div className="flex items-center gap-3">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-habesha-gold/45 bg-white/5">
                <Image src="/profile.jpg" alt="Dagim Desalegn" fill className="object-cover" sizes="48px" />
              </span>
              <div>
                <p className="font-heading text-lg font-bold">Dagim Desalegn</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-habesha-gold/75">Full-Stack Developer</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
              Building useful digital products with thoughtful interfaces, reliable code, and an Ethiopian-inspired visual identity.
            </p>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full border border-habesha-gold/30 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:border-habesha-gold hover:bg-habesha-gold hover:text-foreground">
              Get in touch <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="footer-reveal">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-habesha-gold">Navigate</p>
            <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {navigation.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="group flex min-h-10 items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 text-xs font-semibold text-white/55 transition hover:-translate-y-0.5 hover:border-habesha-gold/35 hover:bg-white/[0.07] hover:text-white"
                >
                  <span>{label}</span>
                  <ArrowUpRight size={13} className="text-habesha-gold/40 transition group-hover:text-habesha-gold" />
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-reveal">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-habesha-gold">Connect</p>
            <div className="mt-4 grid grid-cols-4 gap-2 sm:max-w-[220px] lg:grid-cols-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group grid min-h-11 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-white/55 transition hover:-translate-y-1 hover:border-habesha-gold/55 hover:bg-habesha-gold hover:text-foreground"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <p className="mt-4 text-[11px] leading-5 text-white/30">Find me online and follow my latest work.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Dagim Desalegn</span>
          <span>Built with Next.js · Designed with purpose</span>
        </div>
      </div>
    </footer>
  );
}
