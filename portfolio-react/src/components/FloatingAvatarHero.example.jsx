import FloatingAvatarHero from './FloatingAvatarHero';

/**
 * Example 1: Basic Usage
 * Place this in your Hero section or any component
 */
export function BasicExample() {
  return (
    <section className="hero">
      <div className="container">
        <FloatingAvatarHero />
      </div>
    </section>
  );
}

/**
 * Example 2: Custom Props
 * Adjust float intensity, rotation sensitivity, and dimensions
 */
export function CustomPropsExample() {
  return (
    <FloatingAvatarHero
      modelPath="/models/avatar.glb"
      floatIntensity={0.4}        // More dramatic floating
      rotationIntensity={0.5}     // More responsive to mouse
      height="800px"              // Taller on desktop
      width="100%"
    />
  );
}

/**
 * Example 3: Responsive Heights
 * Different heights for mobile vs desktop
 */
export function ResponsiveExample() {
  return (
    <FloatingAvatarHero
      height={window.innerWidth < 768 ? '500px' : '800px'}
      floatIntensity={0.25}
      rotationIntensity={0.3}
    />
  );
}

/**
 * Example 4: Side-by-Side Layout
 * Use alongside text content in a grid
 */
export function HeroWithAvatarExample() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        {/* Text Content */}
        <div>
          <div className="eyebrow">IT Project Manager · Full‑Stack Developer</div>
          <h1 className="title">Building reliable products and teams.</h1>
          <p className="subtitle">
            I lead cross‑functional squads, translate user insights into roadmaps,
            and ship scalable web apps.
          </p>
          <div className="hero-meta">
            <span className="chip">React · TypeScript</span>
            <span className="chip">Python · Flask</span>
          </div>
        </div>

        {/* Avatar */}
        <div>
          <FloatingAvatarHero
            height="600px"
            floatIntensity={0.2}
            rotationIntensity={0.25}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Example 5: Full-Screen Hero
 * Use as a landing page centerpiece
 */
export function FullScreenExample() {
  return (
    <div className="relative">
      <FloatingAvatarHero
        height="100vh"
        floatIntensity={0.3}
        rotationIntensity={0.4}
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Welcome</h1>
          <p className="text-xl">Scroll to explore</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 6: Using with Tailwind CSS
 */
export function TailwindExample() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="text-5xl font-bold">Hi, I'm Dharm</h1>
            <p className="text-xl text-gray-300">
              Full-stack developer and project manager building the future.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-teal-500 rounded-lg hover:bg-teal-600 transition">
                View Projects
              </button>
              <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-gray-900 transition">
                Contact Me
              </button>
            </div>
          </div>

          <FloatingAvatarHero
            height="600px"
            floatIntensity={0.25}
            rotationIntensity={0.3}
          />
        </div>
      </div>
    </div>
  );
}
