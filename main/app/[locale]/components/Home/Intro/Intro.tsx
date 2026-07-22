import Link from "next/link";

const highlights = [
  {
    title: "Stay in the loop",
    description: "Follow conversations that matter and catch up quickly with fresh updates.",
  },
  {
    title: "Find your people",
    description: "Meet thoughtful members who share your interests and goals.",
  },
  {
    title: "Share with confidence",
    description: "Post ideas, ask questions, and build momentum in a welcoming space.",
  },
  {
    title: "Grow together",
    description: "Learn from others, exchange feedback, and discover new perspectives.",
  },
];

export default function Intro() {
  return (
    <section className="w-full px-2 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-gray-500">
            Why this community
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            A calmer, more inspiring place to connect and create.
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Whether you are here to learn, share, or simply explore, this forum gives you a welcoming space to have meaningful conversations and discover new ideas.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/forum"
              className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800"
            >
              Start exploring
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-gray-900 hover:text-gray-900"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:min-w-[430px]">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
