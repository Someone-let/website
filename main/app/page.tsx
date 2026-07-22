import Hero from "./[locale]/components/Home/Hero/Hero";
import Intro from "./[locale]/components/Home/Intro/Intro";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Intro />
    </main>
  );
}
