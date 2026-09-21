import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { Differentiators } from "../components/Differentiators";
import { Services } from "../components/Services";
import { Rituals } from "../components/Protocols";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { Testimonials } from "../components/Testimonials";
import { Partners } from "../components/Partners";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { ChatSupport } from "../portal/components/ChatSupport";

export function MarketingSite() {
  return (
    <>
      <div className="min-h-screen bg-[#FFF8F3]">
        <Nav />
        <Hero />
        <Stats />
        <Differentiators />
        <Services />
        <Rituals />
        <Pricing />
        <FAQ />
        <Testimonials />
        <Partners />
        <Contact />
        <Footer />
      </div>
      <ChatSupport />
    </>
  );
}
