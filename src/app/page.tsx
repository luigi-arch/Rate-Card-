import { SelectionProvider } from "@/context/selection";
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

export default function Home() {
  return (
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
  );
}
