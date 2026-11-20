import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-adwa-green px-6 text-white tibeb-grid-dark">
      <div className="max-w-lg text-center">
        <p className="font-ethiopic text-sm text-habesha-gold">404 · ይቅርታ</p>
        <h1 className="mt-4 font-heading text-5xl font-bold">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/60">The page you requested could not be found.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-habesha-gold px-5 py-3 text-sm font-bold text-foreground">Return home</Link>
      </div>
    </main>
  );
}
