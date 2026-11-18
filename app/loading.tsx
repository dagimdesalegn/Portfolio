import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] grid min-h-screen place-items-center bg-adwa-green text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="loading-mark relative h-16 w-16 overflow-hidden rounded-2xl border border-habesha-gold/60 bg-white/5">
          <Image src="/profile.jpg" alt="" fill className="object-cover" sizes="64px" />
        </div>
        <div className="h-px w-32 overflow-hidden bg-white/15">
          <div className="loading-bar h-full w-1/2 bg-habesha-gold" />
        </div>
      </div>
    </div>
  );
}
