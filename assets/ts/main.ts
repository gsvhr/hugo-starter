import { initContactForm } from './contact';

document.addEventListener('DOMContentLoaded', () => {
  // Проверка сохраненной темы
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  // Инициализация контактных форм
  document.querySelectorAll<HTMLFormElement>('.contact-form').forEach(initContactForm);
  // Инициализация переключателей темы
  document.querySelectorAll('.theme-switcher button').forEach((button) => {
    button.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });
  // Проверка поддержки CSS  браузером
  if (typeof CSSLayerBlockRule == 'undefined') {
    //alert('Ваш браузер устарел. 😢\nСайт отображается не корректно.\nОбновите версию браузера.');
  }
});
