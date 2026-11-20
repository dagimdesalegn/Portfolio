"use client";

import { useState } from "react";
import { Award, ExternalLink, ShieldCheck, CalendarDays } from "lucide-react";
import type { Certificate } from "@/lib/content";

function CertificatePreview({ item }: { item: Certificate }) {
  const fallback = item.credentialUrl
    ? `https://image.thum.io/get/width/1200/crop/900/noanimate/${item.credentialUrl}`
    : "";
  const [src, setSrc] = useState(item.imageUrl || fallback);

  if (!src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-adwa-green px-6 text-center">
        <Award className="text-habesha-gold" size={34} />
        <p className="mt-3 font-heading text-lg font-bold text-white">{item.issuer || "Credential"}</p>
        <p className="mt-1 text-xs leading-5 text-white/60">Credential details available below</p>
      </div>
    );
  }

  return <img src={src} alt={item.title || "Certificate"} loading="lazy"
    onError={() => { if (fallback && src !== fallback) setSrc(fallback); else setSrc(""); }}
    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />;
}

export default function Certificates({ items }: { items: Certificate[] }) {
  return (
<<<<<<< HEAD
    <section id="certificates" className="site-section site-section-certificates relative overflow-hidden py-20 sm:py-28">
=======
    <section id="certificates" className="ethiopian-section relative mx-auto max-w-7xl px-5 py-20 sm:px-7 sm:py-28">
>>>>>>> a553802073d500abc7ec9cfcbfa784dad1c23580
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-terracotta">Credentials</p>
        <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-adwa-green sm:text-4xl">Certifications & awards</h2>
        <p className="mt-3 text-sm leading-7 text-foreground/55">Credentials, learning milestones, and achievements.</p>
      </div>
      {items.length === 0 ? (
        <div className="tibeb-grid rounded-[2rem] border border-habesha-gold/30 bg-white/60 p-8 text-center shadow-tibeb">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-adwa-green text-habesha-gold"><Award size={22}/></div>
          <h3 className="mt-5 font-heading text-xl font-bold text-adwa-green">Certifications will appear here</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-foreground/50">Add certificates from the private admin panel.</p>
        </div>
      ) : (
<<<<<<< HEAD
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3 sm:px-7">
          {items.map(item => (
            <article key={item.id} className="certificate-card group overflow-hidden rounded-[2rem] border border-habesha-gold/30 bg-white/85 shadow-tibeb backdrop-blur">
=======
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(item => (
            <article key={item.id} className="certificate-card group overflow-hidden rounded-[2rem] border border-habesha-gold/30 bg-white/75 shadow-tibeb">
>>>>>>> a553802073d500abc7ec9cfcbfa784dad1c23580
              <a href={item.credentialUrl || item.imageUrl || "#"} target="_blank" rel="noreferrer" className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-adwa-green">
                  <CertificatePreview item={item} />
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/30 bg-adwa-green text-habesha-gold shadow-lg"><Award size={17}/></span>
                  {item.credentialUrl && <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur"><ShieldCheck size={12}/> Verify</span>}
                </div>
              </a>
              <div className="border-t border-habesha-gold/20 p-5 sm:p-6">
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-terracotta">{item.issuer || "Credential"}</p>
                <div className="mt-1 flex items-start justify-between gap-3">
                  <div><h3 className="font-heading text-base font-bold text-adwa-green">{item.title || "Certificate"}</h3>
                    {item.date && <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-foreground/45"><CalendarDays size={12}/>{item.date}</p>}
                  </div>
                  {(item.credentialUrl || item.imageUrl) && <ExternalLink size={15} className="mt-1 shrink-0 text-foreground/30"/>}
                </div>
                {item.description && <p className="mt-3 text-sm leading-6 text-foreground/55">{item.description}</p>}
                {item.credentialId && <p className="mt-3 break-all text-[11px] text-foreground/40">Credential ID: {item.credentialId}</p>}
                {item.credentialUrl && <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-adwa-green px-4 py-2 text-xs font-bold text-white transition hover:bg-terracotta">View credential</a>}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
