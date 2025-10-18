import useScrollReveal from '../hooks/useScrollReveal';

function AboutCard({ title, description }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`card scroll-reveal-stagger ${isVisible ? 'visible' : ''}`}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function About() {
  const [headerRef, headerVisible] = useScrollReveal();

  const cards = [
    {
      title: 'Project Leadership',
      description: 'Agile planning, stakeholder alignment, risk management, and outcomes‑focused delivery.'
    },
    {
      title: 'Product & UX',
      description: 'User interviews, experiment design, measurement plans, and data‑informed roadmaps.'
    },
    {
      title: 'Full‑Stack Engineering',
      description: 'React/TypeScript front‑ends, Python/Flask services, SQL data models, CI automation.'
    }
  ];

  return (
    <section id="about">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-head scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="section-title">About</h2>
          <p className="section-desc">
            Blending product sense with engineering discipline. I've managed delivery for cross‑functional teams,
            improved user satisfaction by 30%, and maintained 99.9% uptime across critical apps.
          </p>
        </div>
        <div className="grid cols-3">
          {cards.map((card, index) => (
            <AboutCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
