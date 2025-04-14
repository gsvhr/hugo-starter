import { Message, Result } from './types';

const API_ENDPOINT = 'https://functions.yandexcloud.net/d4ehgtkcf9e302257mjc';

export async function sendMessage(message: Message): Promise<Result<string>> {
  const { city, phone, body } = message;
  const msgCity = city?.trim();
  const msgPhone = phone?.trim();
  const msgBody = body?.trim();

  if (!msgCity || !msgPhone) {
    return {
      status: 'error',
      error: new Error('Поля Город и Номер телефона обязательны'),
    };
  }

  try {
    const url = new URL(API_ENDPOINT);
    url.searchParams.set('city', msgCity);
    url.searchParams.set('phone', msgPhone);
    if (msgBody) url.searchParams.set('message', msgBody);
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    return {
      status: 'success',
      data: `Сообщение ==${msgBody}== из города ${msgCity} (телефон: ${msgPhone}) успешно обработано.`,
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}
