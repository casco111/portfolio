// Theme initialization and toggle with persistence
(function () {
  const storageKey = 'theme-preference';
  const classDark = 'theme-dark';

  document.getElementById("year").textContent = new Date().getFullYear();

  function getPreferredTheme() {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'dark' || stored === 'light') return stored;
    return 'dark';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add(classDark);
    } else {
      root.classList.remove(classDark);
    }
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    const img = document.getElementById('theme-icon');
    if (!btn) return;
    const iconUrl = theme === 'dark' ? 'images/sun.png' : 'images/moon.png';
    if (img) {
      img.src = iconUrl;
    }
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function setTheme(theme) {
    localStorage.setItem(storageKey, theme);
    applyTheme(theme);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Apply initial
    applyTheme(getPreferredTheme());

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const isDark = document.documentElement.classList.contains(classDark);
        setTheme(isDark ? 'light' : 'dark');
      });
    }

    // React to system changes if user hasn't explicitly chosen
    const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    if (media) {
      media.addEventListener ? media.addEventListener('change', onSystemChange) : media.addListener(onSystemChange);
    }
    function onSystemChange(e) {
      const stored = localStorage.getItem(storageKey);
      if (stored !== 'dark' && stored !== 'light') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    }
  });

  const avatarImage = document.getElementById("avatarImg");
  avatarImage.addEventListener("mouseover", () =>
  {
    avatarImage.src = "images/profile2.jpg"
    avatarImage.classList.add("pulseIn");
    avatarImage.classList.remove("pulseOut");
  });
  avatarImage.addEventListener("mouseout", () =>
    {
      avatarImage.src = "images/profile1.jpg"
      avatarImage.classList.remove("pulseIn");
    avatarImage.classList.add("pulseOut");
    });
})();

