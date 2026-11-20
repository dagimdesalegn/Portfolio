import { Sparkles, ArrowUpRight } from "lucide-react";

export default function About({
  content,
}: {
  content: { eyebrow: string; title: string; body: string };
}) {
  const paragraphs = content.body
    .split(/\r?\n\s*\r?\n/)
    .filter(Boolean);

  return (
<<<<<<< HEAD
    <section id="about" className="site-section site-section-about relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8">
=======
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
>>>>>>> a553802073d500abc7ec9cfcbfa784dad1c23580
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-adwa-green/20 bg-white px-4 py-2 text-sm font-medium text-adwa-green">
              <Sparkles className="h-4 w-4" />
              {content.eyebrow}
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {content.title}
            </h2>
          </div>

<<<<<<< HEAD
          <div className="about-card about-reveal rounded-[2rem] border border-habesha-gold/25 bg-white/80 p-6 shadow-tibeb backdrop-blur sm:p-8 lg:p-10">
=======
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
>>>>>>> a553802073d500abc7ec9cfcbfa784dad1c23580
            <div className="space-y-5 text-base leading-8 text-black/70">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-adwa-green">
              <span>More about me</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
