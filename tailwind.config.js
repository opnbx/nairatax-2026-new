/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Navy — primary / structure
        navy: {
          900: '#081426',
          800: '#0B1B34',
          glow: '#1C3C68',
        },
        ink: {
          heading: '#0B1B34',
          body: '#33425C',
          body2: '#41506A',
        },
        muted: {
          DEFAULT: '#5C6B82',
          2: '#8A93A5',
          3: '#9AA4B4',
        },
        // Text on navy
        onnavy: {
          strong: '#FFFFFF',
          1: '#A9B6CC',
          2: '#9FB0C9',
          3: '#8FA0BA',
        },
        // Brass / gold
        gold: {
          fill: '#C7A24C',
          light: '#8C6E22',
          eyebrow: '#9A7B24',
          onnavy: '#D9C283',
          soft: '#F3EAD3',
        },
        // Success / exempt
        pos: {
          DEFAULT: '#1F8A5B',
          onnavy: '#7DD3A8',
        },
        // Surfaces & lines
        paper: '#FFFFFF',
        canvas: '#DEE2EA',
        tint: '#F3F6FA',
        fieldsoft: '#F5F7FA',
        hairline: {
          DEFAULT: '#E7EBF1',
          2: '#EDF0F5',
          3: '#E4E9F0',
        },
        inputborder: '#D7DEE8',
        placeholder: '#AEB6C2',
        // Data-bar segments
        bar: {
          net: '#5C7CB0',
          tax: '#C7A24C',
          ded: '#AEB8C6',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Source Serif 4', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Libre Franklin', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        input: '10px',
        card: '14px',
        calc: '18px',
        board: '16px',
        chip: '6px',
        btn: '10px',
      },
      boxShadow: {
        board: '0 50px 130px -50px rgba(11,27,52,0.55), 0 6px 20px rgba(11,27,52,0.08)',
        calc: '0 2px 4px rgba(9,20,40,0.1), 0 40px 80px -34px rgba(4,12,28,0.75)',
        cardhover: '0 20px 42px -22px rgba(11,27,52,0.4)',
      },
      letterSpacing: {
        eyebrow: '0.16em',
        ribbon: '0.08em',
      },
      maxWidth: {
        board: '1440px',
      },
    },
  },
  plugins: [],
}
