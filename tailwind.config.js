// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
    theme: {
      extend: {
        fontFamily: {
          display: ['var(--font-display)'],
          body: ['var(--font-body)'],
        },
        colors: {
          canvas: 'var(--bg-canvas)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          text: {
            primary: 'var(--text-primary)',
            secondary: 'var(--text-secondary)',
            muted: 'var(--text-muted)',
          },
          accent: 'var(--accent)',
          success: 'var(--success)',
          border: {
            soft: 'var(--border-soft)'
          }
        },
        borderRadius: {
          sm: 'var(--radius-sm)',
          md: 'var(--radius-md)',
          lg: 'var(--radius-lg)',
          xl: 'var(--radius-xl)',
          pill: 'var(--radius-pill)',
        },
        boxShadow: {
          1: 'var(--shadow-1)',
          2: 'var(--shadow-2)',
          3: 'var(--shadow-3)',
        },
        spacing: {
          1: 'var(--space-1)',
          2: 'var(--space-2)',
          3: 'var(--space-3)',
          4: 'var(--space-4)',
          5: 'var(--space-5)',
          6: 'var(--space-6)',
          8: 'var(--space-8)',
          10: 'var(--space-10)',
          12: 'var(--space-12)',
          16: 'var(--space-16)',
          20: 'var(--space-20)',
          24: 'var(--space-24)',
        },
        keyframes: {
          'sf-enter-bounce': {
            '0%':   { transform: 'translateY(20px) scale(0.98)', opacity: '0' },
            '60%':  { transform: 'translateY(-4px) scale(1.02)', opacity: '1' },
            '100%': { transform: 'translateY(0) scale(1)' }
          },
          'sf-orbit': {
            '0%':   { transform: 'translate3d(0,0,0) rotate(0deg)' },
            '100%': { transform: 'translate3d(0,0,0) rotate(360deg)' }
          },
          'sf-ripple': {
            '0%':   { transform: 'scale(0)', opacity: '0.35' },
            '100%': { transform: 'scale(9)', opacity: '0' }
          }
        },
        animation: {
          'enter-bounce': 'sf-enter-bounce var(--dur-4) var(--ease-elastic-out) both',
          'orbit-slow': 'sf-orbit 36s linear infinite',
          'ripple': 'sf-ripple 600ms var(--ease-decelerate)',
        }
      }
    },
    plugins: [
      function({ addVariant }) {
        addVariant('hocus', ['&:hover', '&:focus-visible']);
        addVariant('aria-current', ['&[aria-current="page"]']);
        addVariant('aria-pressed', ['&[aria-pressed="true"]']);
        addVariant('disabled', ['&[disabled]', '&[aria-disabled="true"]']);
        addVariant('state-open', ['&[data-state="open"]']);
      }
    ]
  }
  