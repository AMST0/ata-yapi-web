import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Trust from "@/components/home/Trust";
import BalconyCalculator from "@/components/calculator/BalconyCalculator";
import FAQ from "@/components/home/FAQ";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Trust />
      <BalconyCalculator />
      <FAQ />
      <Contact />
    </>
  );
}
