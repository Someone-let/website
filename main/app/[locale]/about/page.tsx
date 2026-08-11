import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export const metadata = {
  title: "About Us | Minimal Monochrome",
  description: "Learn more about our mission, vision, and team.",
};

const stats = [
  { label: "Years of Experience", value: "10+" },
  { label: "Projects Completed", value: "250+" },
  { label: "Global Clients", value: "80+" },
  { label: "Team Members", value: "24" },
];

const values = [
  {
    title: "Simplicity First",
    description:
      "We strip away the unnecessary to focus purely on what creates value, functionality, and timeless aesthetics.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Uncompromising Quality",
    description:
      "Precision in every pixel, line of code, and architectural decision. Mediocrity is never an option.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Continuous Innovation",
    description:
      "We constantly push modern boundaries, adopting cutting-edge tools to stay ahead in a fast-evolving space.",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const team = [
  {
    name: "Alex Mercer",
    role: "Founder & Creative Director",
    bio: "Focused on structural clarity and visual minimalism with over 12 years in digital design.",
  },
  {
    name: "Elena Vance",
    role: "Lead Engineer",
    bio: "Passionate about scalable systems, performance optimization, and ultra-fast web architectures.",
  },
  {
    name: "Marcus Thorne",
    role: "Product Strategist",
    bio: "Specializes in transforming complex user problems into intuitive digital products.",
  },
];

export default async function AboutPage() {
  const t = await getTranslations("about");
  const locale = await getLocale();

  return (
    <main className="bg-black text-neutral-200 min-h-screen selection:bg-neutral-800 selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,120,120,0.15),rgba(255,255,255,0))]" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-32">
        
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1 text-xs text-neutral-400 uppercase tracking-widest backdrop-blur-sm">
            <span>{t("badge")}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
            {t("heroTitle")}
          </h1>

          <p className="text-lg text-neutral-400 leading-relaxed">
            {t("heroDescription")}
          </p>
        </section>

        {/* STATS SECTION */}
        <section className="mt-20 py-12 border-y border-neutral-900 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-500">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* OUR STORY / MISSION */}
        <section className="mt-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t("missionTitle")}
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              {t("missionDescription1")}
            </p>
            <p className="text-neutral-400 leading-relaxed">
              {t("missionDescription2")}
            </p>
          </div>

          {/* Abstract Monochrome Visual Graphic */}
          <div className="relative aspect-square md:aspect-auto h-72 md:h-96 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-8 flex flex-col justify-between overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-neutral-800/20 rounded-full blur-3xl group-hover:bg-neutral-700/30 transition duration-700" />
            <div className="flex justify-between items-center text-xs text-neutral-500 font-mono tracking-wider">
              <span>MANIFESTO</span>
              <span>01 / 03</span>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-medium text-neutral-300">
                &ldquo;Elegance is not abundance, but the total absence of unnecessary noise.&rdquo;
              </p>
            </div>
            <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
              <div className="h-full bg-neutral-400 w-1/3 group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="mt-28 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">{t("valuesTitle")}</h2>
            <p className="text-neutral-400">{t("valuesSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 transition duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="mt-28 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">{t("teamTitle")}</h2>
            <p className="text-neutral-400">{t("teamSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Monochromatic Avatar Placeholder */}
                  <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white font-bold text-xl">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-xs text-neutral-500 font-mono tracking-wide">{member.role}</p>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="mt-28 p-10 md:p-16 rounded-3xl bg-neutral-950 border border-neutral-800 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-900/30 to-transparent pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight relative z-10">
            {t("ctaTitle")}
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base relative z-10">
            {t("ctaDescription")}
          </p>
          <div className="pt-2 relative z-10">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-neutral-200 transition duration-200 text-sm"
            >
              {t("ctaButton")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}