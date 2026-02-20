import ScrollReveal from "./components/ScrollReveal";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProjectsGrid from "./components/ProjectsGrid";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <section id="about" className="mb-24">
        {/* Hero heading — visible on mobile only, sidebar handles desktop */}
        <ScrollReveal>
          <div className="mb-10 lg:hidden">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-lightest sm:text-5xl">
              Martijn Kort
            </h1>
            <p className="mt-3 font-heading text-lg font-medium text-slate-light">
              Process Owner · AI-specialist · Utrecht
            </p>
          </div>
        </ScrollReveal>

        {/* Hero statement — always visible, first thing to read */}
        <ScrollReveal delay={0.1}>
          <blockquote className="mb-10 space-y-2">
            <p className="font-heading text-2xl font-semibold leading-snug tracking-tight text-lightest sm:text-3xl">
              De meeste mensen zijn óf goed in processen, óf in technologie.
            </p>
            <p className="font-heading text-2xl font-semibold leading-snug tracking-tight text-accent italic sm:text-3xl">
              Ik weiger te kiezen.
            </p>
          </blockquote>
        </ScrollReveal>

        {/* Section label — mobile only */}
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
          Over mij
        </h2>

        {/* About intro text — always visible */}
        <ScrollReveal delay={0.2}>
          <div className="space-y-4 leading-relaxed">
            <p>
              Waar anderen al jaren een workaround accepteren, zie ik processen
              die vastlopen. Dat accepteren is me nooit gelukt.
            </p>
            <p>
              Bij Bol. leerde ik processen verbeteren en teams in beweging
              krijgen. Maar er miste iets: een gereedschapskist die net zo snel
              meedacht als ik. Die vond ik in AI. Niet als buzzword. Als
              oplossing.
            </p>
            <p>
              Nu werk ik als Process Owner bij ICM. Ik breng procesregie en
              leertrajecten samen, en zoek continu de plek waar technologie écht
              het verschil maakt. In mijn vrije tijd bouw ik met Claude Code.
              Soms om iets op te lossen, soms omdat ik wil weten hoe het werkt.
              En vaak gewoon omdat het leuk is.
            </p>
            <p>
              Wat daaruit komt, vind je onder{" "}
              <a
                href="#projects"
                className="text-accent hover:underline underline-offset-4 transition-colors duration-200"
              >
                Projecten
              </a>
              .
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section id="experience" className="mb-24">
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
          Ervaring
        </h2>
        <ExperienceTimeline />
      </section>

      <section id="projects" className="mb-24">
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
          Projecten
        </h2>
        <p className="mb-8 text-sm italic leading-relaxed text-slate">
          Ik ben net begonnen met bouwen in het openbaar. Deze portfolio is mijn
          eerste GitHub-repo. Meer projecten volgen.
        </p>
        <ProjectsGrid />
      </section>

<section id="contact" className="mb-24">
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-accent mb-8 lg:hidden">
          Contact
        </h2>
        <ContactSection />
      </section>
    </>
  );
}
