import {
  About,
  Contact,
  Experience,
  Hero,
  Projects,
  ScrollScene,
  SiteHeader,
  Skills,
} from "@/widgets/home";

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <ScrollScene />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
