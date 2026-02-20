import ScrollReveal from "./components/ScrollReveal";
import ExperienceTimeline from "./components/ExperienceTimeline";

export default function Home() {
  return (
    <>
      <section id="about" className="mb-24">
        {/* Hero heading — visible on mobile only, sidebar handles desktop */}
        <ScrollReveal>
          <div className="mb-8 lg:hidden">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-lightest sm:text-5xl">
              Martijn Kort
            </h1>
            <p className="mt-3 font-heading text-lg font-medium text-slate-light">
              Process Owner | AI &amp; Automatisering
            </p>
          </div>
        </ScrollReveal>

        {/* Section label — mobile only */}
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
          About
        </h2>

        {/* About intro text — always visible */}
        <ScrollReveal delay={0.15}>
          <div className="space-y-4 leading-relaxed">
            <p className="text-lightest text-lg">
              HBO-professional gespecialiseerd in procesoptimalisatie, AI en
              automatisering.
            </p>
            <p>
              Empathisch, analytisch, sterk in het vertalen van knelpunten naar
              concrete oplossingen. Momenteel werkzaam bij ICM in Utrecht.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section id="experience" className="mb-24">
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
          Experience
        </h2>
        <ExperienceTimeline />
      </section>

      <section id="projects" className="mb-24">
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
          Projects
        </h2>
        <ScrollReveal>
          <div className="leading-relaxed">
            <p className="text-slate-light">Projecten komen hier.</p>
          </div>
        </ScrollReveal>
      </section>

      <section id="skills" className="mb-24">
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
          Skills
        </h2>
        <ScrollReveal>
          <div className="leading-relaxed">
            <p className="text-slate-light">Skills overzicht volgt.</p>
          </div>
        </ScrollReveal>
      </section>

      <section id="contact" className="mb-24">
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
          Contact
        </h2>
        <ScrollReveal>
          <div className="leading-relaxed">
            <p className="text-slate-light">
              Neem gerust contact met me op via{" "}
              <a
                href="mailto:martijn.kort@hotmail.com"
                className="text-accent hover:underline underline-offset-4 transition-colors duration-200"
              >
                martijn.kort@hotmail.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
