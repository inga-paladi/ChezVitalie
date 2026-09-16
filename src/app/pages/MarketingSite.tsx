import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { Differentiators } from "../components/Differentiators";
import { Services } from "../components/Services";
import { Testimonials } from "../components/Testimonials";
import { Partners } from "../components/Partners";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { ChatSupport } from "../portal/components/ChatSupport";

export function MarketingSite() {
  return (
    <>
      <div className="min-h-screen bg-[#120304]">
        <Nav />
        <Hero />
        <Stats />
        <Differentiators />
        <Services />
        <Testimonials />
        <Partners />
        <Contact />
        <Footer />
      </div>
      <ChatSupport />
    </>
  );
}
