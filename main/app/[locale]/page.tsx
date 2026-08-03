import Hero from "./components/Home/Hero/Hero";
import Intro from "./components/Home/Intro/Intro";
import FooterSection from "./components/Footer/FooterSection";

export default function LocaleHomePage() {
  return (
    <main className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Intro />
      <FooterSection />
    </main>
  );
}
