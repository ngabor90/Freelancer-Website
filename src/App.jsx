import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { IntroLoader } from "@/components/IntroLoader";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <IntroLoader />
        <div className="min-h-screen overflow-x-hidden">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
