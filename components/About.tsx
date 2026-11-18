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
        </div>
      </div>
    </section>
  );
}
