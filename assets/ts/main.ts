import { initContactForm } from './contact';

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация контактных форм
  document.querySelectorAll<HTMLFormElement>('.contact-form').forEach(initContactForm);

  // Инициализация переключателей темы
  document.querySelectorAll<HTMLInputElement>('.theme-controller').forEach((checkbox) => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    checkbox.checked = savedTheme === 'dark';
    document.documentElement.dataset.theme = savedTheme;
    checkbox.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const theme = target.checked ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      document.documentElement.dataset.theme = theme;
    });
  });

  // Проверка поддержки CSS  браузером
  if (typeof CSSLayerBlockRule == 'undefined') {
    alert('Ваш браузер устарел. 😢\nСайт отображается не корректно.\nОбновите версию браузера.');
  }
});
