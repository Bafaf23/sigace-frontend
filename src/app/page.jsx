import About from "@/components/organism/About";
import Footer from "@/components/organism/Footer";
import Header from "@/components/organism/Header";
import Hero from "@/components/organism/Hero";
import Plans from "@/components/organism/Plans";

export default function Home() {
  return (
    <main className="min-h-full flex flex-col">
      <Header />
      <Hero />
      <About />
      <Plans />
      <Footer />
    </main>
  );
}
