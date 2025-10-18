import useMagneticEffect from '../hooks/useMagneticEffect';
import useScrollReveal from '../hooks/useScrollReveal';

function MagneticPill({ children, ...props }) {
  const magneticRef = useMagneticEffect(0.2);
  return (
    <a ref={magneticRef} className="pill magnetic" {...props}>
      {children}
    </a>
  );
}

function StaticPill({ children }) {
  return <div className="pill">{children}</div>;
}

export default function Contact() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal();

  return (
    <section id="contact">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-head scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="section-title">Let's connect</h2>
          <p className="section-desc">
            Open to internships and collaborations. The fastest way to reach me is via email.
          </p>
        </div>
        <div
          ref={cardsRef}
          className={`contact-card scroll-reveal ${cardsVisible ? 'visible' : ''}`}
        >
          <MagneticPill href="mailto:dharm.pat04@gmail.com">
            ✉️ dharm.pat04@gmail.com
          </MagneticPill>
          <MagneticPill href="tel:+64211651634">
            📞 +64 21 165 1634
          </MagneticPill>
          <StaticPill>📍 Auckland, New Zealand</StaticPill>
        </div>
      </div>
    </section>
  );
}
