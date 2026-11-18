import Image from "next/image";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/dagimdesalegn", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
  { label: "X", href: "https://x.com/", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com/", icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-habesha-gold/30 bg-adwa-green text-white">
      <div className="absolute inset-0 tibeb-grid-dark opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-7">
        <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-habesha-gold/45 bg-white/5"><Image src="/profile.jpg" alt="Dagim Desalegn" fill className="object-cover" sizes="44px" /></span>
              <div><p className="font-heading text-lg font-bold">Dagim Desalegn</p><p className="text-xs uppercase tracking-[0.18em] text-white/45">Full-Stack Developer</p></div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">Building useful digital products with thoughtful interfaces, reliable code, and an Ethiopian-inspired visual identity.</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-habesha-gold">Navigate</p>
            <div className="mt-4 grid gap-3 text-sm text-white/60">
              <a href="#top" className="transition hover:text-white">Home</a>
              <a href="#projects" className="transition hover:text-white">Projects</a>
              <a href="#experience" className="transition hover:text-white">Experience</a>
              <a href="#certificates" className="transition hover:text-white">Certificates</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-habesha-gold">Social</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white/65 transition hover:border-habesha-gold hover:bg-habesha-gold hover:text-foreground"><Icon size={16} /></a>)}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Dagim Desalegn</span>
          <span>Made with care · Ethiopia</span>
        </div>
      </div>
    </footer>
  );
}
