import telebot
import json
import re
from urllib.parse import parse_qs, unquote

TOKEN = '2046448922:AAFg9Npk-2S4GTLv-GC6Lm5wmfaQ_zSfTUw'
CHAT_ID = '1013216368'
ERROR_CHAT_ID = '1013216368'  # <-- Укажите ваш ID для ошибок
bot = telebot.TeleBot(TOKEN, parse_mode='HTML')

def format_phone(phone_value):
    """Форматирует номер телефона: оставляет только цифры, берет последние 10, добавляет +7"""
    if not phone_value:
        return phone_value
    
    # Оставляем только цифры
    digits = re.sub(r'\D', '', phone_value)
    
    # Берем последние 10 цифр
    if len(digits) >= 10:
        last_10_digits = digits[-10:]
        return f'+7{last_10_digits}'
    else:
        # Если цифр меньше 10, возвращаем оригинальное значение
        return phone_value

def handler(event, context):
    try:
        body = event.get('body', '')
        # Если тело пришло в base64, декодируем
        if event.get('isBase64Encoded'):
            import base64
            body = base64.b64decode(body).decode('utf-8')
        body = unquote(body)
        fields = {k: v[0] if v else '' for k, v in parse_qs(body).items()}

        # Проверка на тестовый запрос
        if fields.get('test') == 'test':
            return {
                'statusCode': 200,
                'body': json.dumps({'ok': True, 'message': 'Webhook connected'}),
                'headers': {'Content-Type': 'application/json'}
            }

        # Получаем домен сайта
        headers = event.get('headers', {})
        domain = headers.get('Origin') or headers.get('Referer', 'не определён')

        # Формируем текст для Telegram (исключаем tranid и formid)
        lines = [f"Запрос с сайта: {domain}"]
        
        # Фильтруем поля, исключая tranid и formid
        excluded_fields = ['tranid', 'formid']
        
        for k, v in fields.items():
            if k not in excluded_fields:
                # Если поле называется phone (в любом регистре), форматируем его
                if k.lower() == 'phone':
                    v = format_phone(v)
                lines.append(f"{k}: {v}")
        
        text = '\n'.join(lines)

        # Отправка сообщения
        bot.send_message(CHAT_ID, text)

        return {
            'statusCode': 200,
            'body': json.dumps({'ok': True}),
            'headers': {'Content-Type': 'application/json'}
        }
    except Exception as e:
        # Отправка ошибки в отдельный чат
        error_text = f"Ошибка в webhook:\n{str(e)}"
        try:
            bot.send_message(ERROR_CHAT_ID, error_text)
        except Exception:
            pass  # Не мешаем основному потоку, если не удалось отправить ошибку
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
            'headers': {'Content-Type': 'application/json'}
        }