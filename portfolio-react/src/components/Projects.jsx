export default function Projects() {
  const projects = [
    {
      badges: ['Community Impact Finalist', 'PM · Front-end'],
      title: 'UnHinged',
      description: 'Led Agile delivery for a React/TypeScript + Flask platform with AI conversation generation (Gemma 2B & Llama 3). Designed uptime-first ops with observability.',
      tech: '⚙ React · TypeScript · Flask · SD',
      link: 'https://www.youtube.com/watch?v=hp_7ISEBGRw',
      linkText: 'Watch Demo→'
    },
    {
      badges: ['Team Lead', 'Immersive Tech'],
      title: 'VR Construction Safety Training',
      description: 'Developed an immersive Unity VR training simulator for construction safety awareness. Integrated AI behaviour tracking and scenario-based hazard recognition for workforce upskilling.',
      tech: '🏗️ Unity · C# · XR · AI',
      link: 'https://github.com/DPATTYY/VR-CONSTRUCTION-SAFETY',
      linkText: 'View Repo→'
    },
    {
      badges: ['Full Stack', 'AI + UX'],
      title: 'Real-Time Survey Emotion Recognition System',
      description: 'Built a multimodal survey platform combining a Flask API and React front-end for real-time emotion detection. Integrated MediaPipe for face tracking and TorchScript models for classifying seven emotions during user responses.',
      tech: '🧠 Flask · React · PyTorch · MediaPipe',
      link: 'https://github.com/DPATTYY/Multimodal-Survey',
      linkText: 'View repo→'
    }
  ];

  return (
    <section id="projects">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">
            A handful of initiatives that showcase delivery, craftsmanship, and measurable impact.
          </p>
        </div>

        <div className="grid cols-3">
          {projects.map((project, index) => (
            <article key={index} className="card card-hover">
              <div className="badges">
                {project.badges.map((badge, idx) => (
                  <span key={idx} className="badge">{badge}</span>
                ))}
              </div>
              <h3 style={{ marginTop: '10px' }}>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                <div className="meta-left">{project.tech}</div>
                <div className="meta-right">
                  <a href={project.link}>{project.linkText}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
