import useScrollReveal from '../hooks/useScrollReveal';

function TimelineItem({ exp }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`tl-item scroll-reveal-left ${isVisible ? 'visible' : ''}`}
    >
      <div className="tl-when">{exp.when}</div>
      <div className="tl-what">
        <h4>{exp.title}</h4>
        <p>{exp.description}</p>
      </div>
    </div>
  );
}

export default function Experience() {
  const [headerRef, headerVisible] = useScrollReveal();

  const experiences = [
    {
      when: 'Aug 2024 – Present',
      title: 'Customer Experience Supervisor — Woolworths Group',
      description: 'Orchestrated front-end operations, supervising team of 6 operators; optimized customer flow and training.'
    },
    {
      when: '2022 – Present',
      title: 'Education — University of Auckland',
      description: 'BSc Computer Science (Hons) & BSc IT Management.'
    },
    {
      when: 'Jan 2022 – Sep 2024',
      title: 'Client Advisor — 0800 Mandep',
      description: 'Coordinated logistics and end-to-end event planning with venues and vendors; ensured timely deliveries.'
    },
    {
      when: '2022 – 2024',
      title: 'Events Lead — University of Auckland Esports Club',
      description: 'Organized & scaled gaming events for 100+ students; designed formats to maximize engagement.'
    },
    {
      when: '2020 – 2021',
      title: 'League of Legends A Team Manager — Westlake Boys High',
      description: 'Managed competitive seasons (Summer Champs 2020, 2021); scheduling, performance review, and strategy.'
    }
  ];
  

  return (
    <section id="experience">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-head scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-desc">A concise timeline of roles, leadership, and impact.</p>
        </div>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
