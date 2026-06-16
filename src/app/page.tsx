import { SelectionProvider } from "@/context/selection";
import { ContentProvider } from "@/context/content";
import { getSiteContent } from "@/lib/site-content";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Proof from "@/components/Proof";
import HeadachePicker from "@/components/HeadachePicker";
import Formats from "@/components/Formats";
import Packages from "@/components/Packages";
import Portfolio from "@/components/Portfolio";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import BriefTray from "@/components/BriefTray";

export const dynamic = "force-dynamic";

export default async function Home() {
  const overrides = await getSiteContent();
  return (
    <ContentProvider value={overrides}>
      <SelectionProvider>
        <Nav />
        <main>
          <Hero />
          <Clients />
          <Proof />
          <HeadachePicker />
          <Formats />
          <Packages />
          <Portfolio />
          <LeadForm />
        </main>
        <Footer />
        <BriefTray />
      </SelectionProvider>
    </ContentProvider>
  );
}
