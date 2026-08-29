export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      serif: ['"Young Serif"', 'Georgia', 'serif'],
      mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
        'border-subtle': 'var(--border-subtle)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
      },
    },
  },
  plugins: [],
};