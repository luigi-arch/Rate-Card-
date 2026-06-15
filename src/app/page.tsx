import { SelectionProvider } from "@/context/selection";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Audience from "@/components/Audience";
import HowItWorks from "@/components/HowItWorks";
import HeadachePicker from "@/components/HeadachePicker";
import Formats from "@/components/Formats";
import Packages from "@/components/Packages";
import Distribution from "@/components/Distribution";
import Results from "@/components/Results";
import Portfolio from "@/components/Portfolio";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SelectionProvider>
      <Nav />
      <main>
        <Hero />
        <Clients />
        <Approach />
        <Audience />
        <HowItWorks />
        <HeadachePicker />
        <Formats />
        <Packages />
        <Distribution />
        <Results />
        <Portfolio />
        <LeadForm />
      </main>
      <Footer />
    </SelectionProvider>
  );
}
