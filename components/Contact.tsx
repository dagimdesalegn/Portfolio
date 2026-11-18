"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

type ContactProps = { submitContact: (formData: FormData) => Promise<{ ok: boolean; message: string }> };

export default function Contact({ submitContact }: ContactProps) {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending...");
    const result = await submitContact(new FormData(event.currentTarget));
    setStatus(result.message);
    if (result.ok) event.currentTarget.reset();
  }

  return (
    <section id="contact" className="ethiopian-section relative mx-auto max-w-7xl px-5 py-20 sm:px-7 sm:py-24">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-habesha-gold/30 bg-white/55 p-1 shadow-tibeb">
        <div className="rounded-[1.7rem] bg-background/90 p-6 sm:p-9 lg:p-11">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">Contact</p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-adwa-green sm:text-4xl">Send a message</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/55">Have a project, opportunity, or idea? Share the details and I&apos;ll get back to you.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/55">Name<input required name="name" className="mt-2 w-full rounded-xl border border-habesha-gold/35 bg-white/75 px-4 py-3.5 text-sm font-normal tracking-normal text-foreground outline-none transition focus:border-adwa-green focus:ring-2 focus:ring-habesha-gold/20" /></label>
              <label className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/55">Email<input required type="email" name="email" className="mt-2 w-full rounded-xl border border-habesha-gold/35 bg-white/75 px-4 py-3.5 text-sm font-normal tracking-normal text-foreground outline-none transition focus:border-adwa-green focus:ring-2 focus:ring-habesha-gold/20" /></label>
            </div>
            <label className="block text-xs font-bold uppercase tracking-[0.15em] text-foreground/55">Message<textarea required name="message" rows={6} className="mt-2 w-full resize-y rounded-xl border border-habesha-gold/35 bg-white/75 px-4 py-3.5 text-sm font-normal tracking-normal text-foreground outline-none transition focus:border-adwa-green focus:ring-2 focus:ring-habesha-gold/20" /></label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-adwa-green px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-terracotta sm:w-auto"><Send size={15} /> Send Message</button>
              {status && <p className="inline-flex items-center gap-2 text-sm text-adwa-green"><CheckCircle2 size={15} /> {status}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
