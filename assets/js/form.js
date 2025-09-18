// Скрипт для отправки данных формы на серверную функцию с антиспам-проверкой и поддержкой нескольких форм

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.contact-form');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Сброс Bootstrap-валидации
      form.classList.remove('was-validated');

      // Антиспам: поле Username должно быть пустым
      const username = form.elements['Username']?.value?.trim() || '';
      if (username) {
        alert('Обнаружен спам!');
        return;
      }

      // Проверка номера телефона
      const phoneInput = form.elements['Phone'];
      const phone = phoneInput?.value?.trim();
      if (!phone || phone.length !== 12 || !phone.startsWith('+7')) {
        phoneInput.classList.add('is-invalid');
        form.querySelector('.phone-error').textContent = 'Введите полный номер в формате +7XXXXXXXXXX';
        return;
      } else {
        phoneInput.classList.remove('is-invalid');
        form.querySelector('.phone-error').textContent = '';
      }

      // Собираем все поля формы
      const params = [];
      Array.from(form.elements).forEach(el => {
        if (el.name && el.type !== 'submit') {
          params.push(encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value.trim()));
        }
      });
      const body = params.join('&');

      // Отправка данных на серверную функцию
      const url = 'https://functions.yandexcloud.net/d4e1r4e0n184gfudb6d5'; //test
      //'https://functions.yandexcloud.net/d4e0pgle09oasr98sisp';

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body
        });

        if (res.ok) {
          form.reset();
          form.classList.add('was-validated');
          alert('Спасибо! Ваше сообщение отправлено.');
        } else {
          alert('Ошибка отправки. Попробуйте позже.');
        }
      } catch (err) {
        alert('Ошибка соединения. Попробуйте позже.');
      }
    });

    // Сброс ошибок и автокоррекция номера при вводе
    form.elements['Phone']?.addEventListener('input', function (e) {
      let val = this.value.replace(/\D/g, ''); // Оставляем только цифры

      // Автозамена первой цифры
      if (val.length > 0) {
        if (val[0] === '8' || val[0] === '7') {
          val = val.slice(1);
        }
        val = '+7' + val;
      } else {
        val = '+7';
      }

      // Ограничение длины (максимум 12 символов: +7 и 10 цифр)
      val = val.slice(0, 12);

      this.value = val;

      this.classList.remove('is-invalid');
      form.querySelector('.phone-error').textContent = '';
    });

    // Блокируем ввод любых символов кроме цифр и управляющих
    form.elements['Phone']?.addEventListener('keydown', function (e) {
      // Разрешаем: Backspace, Delete, Tab, Arrow keys, Home, End
      if (
        [8, 9, 46, 37, 38, 39, 40, 35, 36].includes(e.keyCode) ||
        // Разрешаем Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
      ) {
        return;
      }
      // Запрещаем ввод любых символов кроме цифр
      if (!/\d/.test(e.key)) {
        e.preventDefault();
      }
    });
  });
});