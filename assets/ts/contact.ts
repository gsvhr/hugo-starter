import { Message } from './types';
import { applyPhoneMask, validateMessage, validatePhone } from './service';
import { sendMessage } from './api';
import { showToast } from './toast';

export const initForm = (form: HTMLFormElement) => {
  const { phoneInput, phoneError, messageInput, messageError } = getFormElements(form);

  if (phoneInput && phoneError) {
    setupPhoneValidation(phoneInput, phoneError);
  }

  if (messageInput && messageError) {
    setupMessageValidation(messageInput, messageError);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit(form);
  });
};

let isSubmitting = false;

const getFormElements = (form: HTMLFormElement) => ({
  phoneInput: form.querySelector<HTMLInputElement>('[name="Phone"]'),
  phoneError: form.querySelector<HTMLSpanElement>('.phone-error'),
  messageInput: form.querySelector<HTMLTextAreaElement>('[name="Message"]'),
  messageError: form.querySelector<HTMLSpanElement>('.message-error'),
});

const setupPhoneValidation = (input: HTMLInputElement, error: HTMLSpanElement) => {
  const handleInput = (e: Event) => {
    applyPhoneMask(e);
    error.textContent = '';
  };

  input.addEventListener('input', handleInput);
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (['Backspace', 'Delete'].includes(e.key)) {
      setTimeout(() => handleInput(e), 0);
    }
  });
};

const setupMessageValidation = (input: HTMLTextAreaElement, error: HTMLSpanElement) => {
  const clearError = () => (error.textContent = '');

  input.addEventListener('input', clearError);
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (['Backspace', 'Delete'].includes(e.key)) {
      setTimeout(clearError, 0);
    }
  });
};

const handleFormSubmit = async (form: HTMLFormElement) => {
  if (isSubmitting) return;
  isSubmitting = true;

  const { phoneInput, phoneError, messageInput, messageError } = getFormElements(form);

  if (!phoneInput || !phoneError) {
    isSubmitting = false;
    return;
  }
  let isValid = false;
  if (!messageInput || !messageError) {
    isValid = validatePhone(phoneInput, phoneError);
  } else {
    isValid = [validatePhone(phoneInput, phoneError), validateMessage(messageInput, messageError)].every(Boolean);
  }

  if (!isValid) {
    form.classList.add('was-validated');
    isSubmitting = false;
    return;
  }

  try {
    const result = await sendMessage(new Message(form.dataset.city ?? 'Город не указан', phoneInput.value.replace(/\D/g, ''), messageInput?.value.trim()));

    showToast(result.status === 'success' ? 'Наш специалист перезвонит Вам <br> в течении 5 мин.' : result.error?.message || 'Произошла ошибка при отправке.', result.status);
    form.reset();
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    showToast('Произошла ошибка при отправке', 'error');
  } finally {
    isSubmitting = false;
  }
};
