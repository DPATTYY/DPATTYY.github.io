import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="topbar">
      <div className="container nav" role="navigation" aria-label="Primary">
        <div className="brand">
          <span>Dharm Patel</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
