import { SyncProvider } from "@/context/SyncContext";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Story from "@/components/Story";
import Marquee from "@/components/Marquee";
import Cascade from "@/components/Cascade";
import Concepts from "@/components/Concepts";

export default function Home() {
  return (
    <SyncProvider>
      <Navbar />
      <main className="bg-ink">
        <Hero />
        <Story />
        <Marquee />
        <Cascade />
        <Concepts />
        <Footer />
      </main>
    </SyncProvider>
  );
}