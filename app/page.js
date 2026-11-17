import Effects from "@/components/Effects";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Marquee from "@/components/Marquee";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Effects />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Marquee />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
