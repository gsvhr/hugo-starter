import { initContactForm } from './contact';
import { ThemeManager } from './theme';

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация контактных форм
  document.querySelectorAll<HTMLFormElement>('.contact-form').forEach(initContactForm);

  // Инициализация переключателей темы
  const themeManager = ThemeManager.getInstance();
  document.querySelectorAll<HTMLInputElement>('.theme-controller').forEach(switchEl => {
    themeManager.registerSwitch(switchEl);
  });

  // Проверка поддержки CSS  браузером
  if (typeof CSSLayerBlockRule == 'undefined') {
    alert('Ваш браузер устарел. 😢\nСайт отображается не корректно.\nОбновите версию браузера.');
  }
});
