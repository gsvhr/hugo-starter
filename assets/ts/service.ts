export function applyPhoneMask(event: Event): void {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, ''); // Удаляем все нецифровые символы

  if (value.length > 11) {
    value = value.slice(0, 11); // Ограничиваем длину номера 11 символами
  }

  let formattedValue = '+7';
  if (value.length > 1) {
    formattedValue += ` (${value.slice(1, 4)}`;
  }
  if (value.length > 4) {
    formattedValue += `) ${value.slice(4, 7)}`;
  }
  if (value.length > 7) {
    formattedValue += `-${value.slice(7, 9)}`;
  }
  if (value.length > 9) {
    formattedValue += `-${value.slice(9, 11)}`;
  }

  input.value = formattedValue;
}

export function validatePhone(phoneInput: HTMLInputElement, phoneError: HTMLSpanElement): boolean {
  phoneError.textContent = '';
  const phoneValue = phoneInput.value.replace(/\D/g, ''); // Удаляем все нецифровые символы

  if (!phoneValue) {
    phoneError.textContent = 'Введите Ваш номер телефона.';
    return false;
  }
  if (!/^\d{11}$/.test(phoneValue)) {
    phoneError.textContent = 'Введите номер телефона полностью.';
    return false;
  }
  return true;
}

export function validateMessage(messageInput: HTMLTextAreaElement, messageError: HTMLSpanElement): boolean {
  messageError.textContent = '';
  const messageValue = messageInput.value.trim();

  if (!messageValue) {
    messageError.textContent = 'Введите Ваш вопрос.';
    return false;
  }
  if (messageValue.length > 500) {
    messageError.textContent = 'Длина текста не должна превышать 500 символов.';
    return false;
  }
  return true;
}
