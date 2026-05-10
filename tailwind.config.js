export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  darkMode: 'media',
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
        navigator: 'var(--accent-navigator)',
        archivist: 'var(--accent-archivist)',
        builder: 'var(--accent-builder)',
        curator: 'var(--accent-curator)',
      },
    },
  },
  plugins: [],
};
