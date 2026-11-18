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
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-adwa-green/20 bg-white px-4 py-2 text-sm font-medium text-adwa-green">
              <Sparkles className="h-4 w-4" />
              {content.eyebrow}
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {content.title}
            </h2>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
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
