import FloatingAvatarHero from './FloatingAvatarHero';

export default function Hero() {
  const titleText = "Building reliable products and teams that deliver.";
  const titleWords = titleText.split(' ');

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">IT Project Manager · Full‑Stack Developer</div>
          <h1 className="title">
            {titleWords.map((word, index) => (
              <span key={index} className="title-word">
                {word}
              </span>
            ))}
          </h1>
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
        <FloatingAvatarHero height="500px" floatIntensity={0.05} rotationIntensity={0.6} />
      </div>
    </section>
  );
}
