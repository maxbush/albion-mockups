import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import RouteSection from "@/components/RouteSection";
import Difference from "@/components/Difference";
import People from "@/components/People";
import World from "@/components/World";
import Proof from "@/components/Proof";
import Journal from "@/components/Journal";
import LeadMagnet from "@/components/LeadMagnet";
import Consult from "@/components/Consult";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <main id="top">
        <Hero />
        <TrustBar />
        <RouteSection />
        <Difference />
        <People />
        <World />
        <Proof />
        <Journal />
        <LeadMagnet />
        <Consult />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
