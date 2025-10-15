export default function Header() {
  return (
    <header className="topbar">
      <div className="container nav" role="navigation" aria-label="Primary">
        <div className="brand">
          <span>Dharm Patel</span>
        </div>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
