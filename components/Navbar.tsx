"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#projects");
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const top = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 24);
      setScrollProgress(total > 0 ? Math.min(1, Math.max(0, top / total)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const sections = links.map(({ href }) => document.querySelector(href)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors ${scrolled ? "border-habesha-gold/35 bg-background/95" : "border-white/10 bg-adwa-green/85"}`}>
      <div className="absolute left-0 top-0 h-[2px] origin-left bg-habesha-gold" style={{ width: `${scrollProgress * 100}%` }} />
      <nav className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-7">
        <a href="#top" onClick={closeMenu} className="group flex shrink-0 items-center gap-3" aria-label="Dagim Desalegn home">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-habesha-gold/55 bg-adwa-green shadow-tibeb">
            <Image src="/profile.jpg" alt="Dagim Desalegn" fill className="object-cover" sizes="40px" />
          </span>
          <span className="hidden sm:block">
            <span className={`block font-heading text-sm font-bold tracking-tight ${scrolled ? "text-adwa-green" : "text-white"}`}>Dagim Desalegn</span>
            <span className={`block text-[10px] uppercase tracking-[0.2em] ${scrolled ? "text-foreground/45" : "text-white/50"}`}>Full-Stack Developer</span>
          </span>
        </a>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <a key={link.href} href={link.href} className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 ${isActive ? "border-habesha-gold/80 bg-adwa-green text-habesha-gold shadow-[0_8px_28px_rgba(212,163,115,.18)]" : `border-habesha-gold/25 ${scrolled ? "bg-white/55 text-foreground/65 hover:border-terracotta/55 hover:text-adwa-green" : "bg-white/5 text-white/70 hover:border-habesha-gold/55 hover:text-white"}`}`}>
                {link.label}
              </a>
            );
          })}
        </div>

        <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border md:hidden ${scrolled ? "border-habesha-gold/35 bg-white/70 text-adwa-green" : "border-white/20 bg-white/10 text-white"}`}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="mobile-nav-enter border-t border-habesha-gold/25 bg-background/98 px-5 py-5 shadow-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${active === link.href ? "border-habesha-gold/50 bg-adwa-green text-white" : "border-transparent text-foreground/70 hover:border-habesha-gold/30 hover:bg-adwa-green/5 hover:text-adwa-green"}`}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
