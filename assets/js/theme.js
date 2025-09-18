class ThemeManager {
  constructor() {
    this.themeKey = 'theme';
    this.init();
  }

  init() {
    this.setTheme(this.getPreferredTheme());
    this.bindEvents();
  }

  getStoredTheme() {
    try {
      return localStorage.getItem(this.themeKey);
    } catch (e) {
      return null;
    }
  }

  setStoredTheme(theme) {
    try {
      localStorage.setItem(this.themeKey, theme);
    } catch (e) {
      // Можно добавить обработку ошибки, если нужно
    }
  }

  getPreferredTheme() {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme) {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    if (currentTheme === theme) return; // Не обновлять, если тема уже установлена
    document.documentElement.setAttribute('data-bs-theme', theme);
    this.updateIcons();
  }

  updateIcons() {
    const theme = this.getPreferredTheme();
    const icons = document.querySelectorAll('.theme-icon');
    icons.forEach(icon => {
      if (icon.classList.contains('theme-icon-light')) {
        icon.classList.toggle('opacity-100', theme === 'light');
        icon.classList.toggle('opacity-0', theme === 'dark');
        icon.classList.toggle('text-warning', theme === 'light');
      }
      if (icon.classList.contains('theme-icon-dark')) {
        icon.classList.toggle('opacity-100', theme === 'dark');
        icon.classList.toggle('opacity-0', theme === 'light');
        icon.classList.toggle('text-info', theme === 'dark');
      }
    });
  }

  bindEvents() {
    document.addEventListener('click', this.handleThemeToggle.bind(this));
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.handleSystemThemeChange.bind(this));
  }

  handleThemeToggle(e) {
    if (e.target.closest('.theme-toggle-btn')) {
      const currentTheme = this.getPreferredTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setStoredTheme(newTheme);
      this.setTheme(newTheme);
    }
  }

  handleSystemThemeChange() {
    if (!this.getStoredTheme()) {
      this.setTheme(this.getPreferredTheme());
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});