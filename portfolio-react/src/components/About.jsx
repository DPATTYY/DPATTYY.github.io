export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">About</h2>
          <p className="section-desc">
            Blending product sense with engineering discipline. I've managed delivery for cross‑functional teams,
            improved user satisfaction by 30%, and maintained 99.9% uptime across critical apps.
          </p>
        </div>
        <div className="grid cols-3">
          <div className="card">
            <h3>Project Leadership</h3>
            <p>Agile planning, stakeholder alignment, risk management, and outcomes‑focused delivery.</p>
          </div>
          <div className="card">
            <h3>Product & UX</h3>
            <p>User interviews, experiment design, measurement plans, and data‑informed roadmaps.</p>
          </div>
          <div className="card">
            <h3>Full‑Stack Engineering</h3>
            <p>React/TypeScript front‑ends, Python/Flask services, SQL data models, CI automation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
