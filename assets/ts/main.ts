import { initForm } from './contact';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll<HTMLFormElement>('.contact-form').forEach(initForm);
});
