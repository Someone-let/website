import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full px-2 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div
        className="relative mx-auto overflow-hidden rounded-[2rem] border border-white/20 bg-cover bg-center shadow-2xl"
        style={{
          backgroundImage: "url('/Gemini_Generated_Image_k2rqnuk2rqnuk2rq.png')",
          minHeight: '420px',
          maxWidth: '1400px',
        }}
      >

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-3 rounded-full border border-white/30 bg-black/50 px-3 py-3 backdrop-blur-sm sm:gap-4 sm:px-5">
          <Link
            href="/forum"
            className="group rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-[0_8px_20px_rgba(255,255,255,0.25)]"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              Get Started
            </span>
          </Link>
          <Link
            href="/about"
            className="group rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)]"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              Learn More
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}