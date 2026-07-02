import { SelectionProvider } from "@/context/selection";
import { ContentProvider } from "@/context/content";
import { getSiteContent } from "@/lib/site-content";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Proof from "@/components/Proof";
import Formats from "@/components/Formats";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Portfolio from "@/components/Portfolio";
import BehindScenes from "@/components/BehindScenes";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import BriefTray from "@/components/BriefTray";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  return (
    <ContentProvider value={content}>
      <SelectionProvider>
        <AnalyticsTracker />
        <Nav />
        <main>
          {/* diagnose → prescribe → build → trust → contact */}
          <Hero />
          <Formats />
          <Services />
          <Packages />
          <About />
          <Proof />
          <Clients />
          <Portfolio />
          <BehindScenes />
          <LeadForm />
        </main>
        <Footer />
        <BriefTray />
      </SelectionProvider>
    </ContentProvider>
  );
}
