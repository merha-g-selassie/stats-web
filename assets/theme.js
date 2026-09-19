(function () {
  const STORAGE_KEY = 'stats-theme';
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const allowed = new Set(['auto', 'light', 'dark']);

  function getPreference() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return allowed.has(saved) ? saved : 'auto';
  }

  function resolve(preference) {
    if (preference === 'light' || preference === 'dark') return preference;
    return media.matches ? 'dark' : 'light';
  }

  function apply(preference) {
    const pref = allowed.has(preference) ? preference : 'auto';
    const resolved = resolve(pref);
    root.dataset.theme = pref;
    root.dataset.mode = resolved; // compatibility with existing chapter widgets
    root.style.colorScheme = resolved;
  }

  function refreshButtons() {
    const pref = getPreference();
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      const active = button.dataset.themeChoice === pref;
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setPreference(preference) {
    const pref = allowed.has(preference) ? preference : 'auto';
    localStorage.setItem(STORAGE_KEY, pref);
    apply(pref);
    refreshButtons();
    // Chart.js and generated SVGs read the theme when the page starts.
    // Reloading keeps every chart perfectly in sync with the chosen theme.
    window.location.reload();
  }

  apply(getPreference());
  window.statsTheme = { getPreference, setPreference, apply };

  document.addEventListener('DOMContentLoaded', () => {
    refreshButtons();
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-theme-choice]');
      if (button) setPreference(button.dataset.themeChoice);
    });
  });

  const systemChanged = () => {
    if (getPreference() === 'auto') {
      apply('auto');
      window.location.reload();
    }
  };
  if (media.addEventListener) media.addEventListener('change', systemChanged);
  else if (media.addListener) media.addListener(systemChanged);
})();
