import LaptopScene from './LaptopScene';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">IT Project Manager · Full‑Stack Developer · Gaming Fanatic</div>
          <h1 className="title">Building reliable products and teams that deliver.</h1>
          <p className="subtitle">
            I lead cross‑functional squads, translate user insights into roadmaps, and ship scalable web apps.
            My toolkit spans Agile delivery, React/TypeScript, Python/Flask, and data‑informed decision‑making.
          </p>
          <div className="hero-meta">
            <span className="chip">Agile/Scrum</span>
            <span className="chip">React · TypeScript</span>
            <span className="chip">Python · Flask</span>
            <span className="chip">UX Research</span>
          </div>
        </div>
        <LaptopScene />
      </div>
    </section>
  );
}
