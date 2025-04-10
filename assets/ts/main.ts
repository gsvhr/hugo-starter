import { Grid } from 'gridjs';

async function getData() {
  try {
    const response = await fetch('price.json');
    if (!response.ok) throw new Error('Ошибка на сервере');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return [];
  }
}

async function initGrid() {
  const data = await getData();
  const priceElement = document.getElementById('price') as HTMLElement;
  if (!priceElement) {
    console.error('Элемент с ID "price" не найден');
    return;
  } else if (!data.length) {
    priceElement.innerHTML = '<p>Нет данных для отображения</p>';
    return;
  }

  new Grid({
    data: data,
    columns: [
      {
        name: 'Раздел',
        id: 'Раздел',
        attributes: {
          class: 'w-50',
        },
      },
      {
        name: 'Наименование работ',
        id: 'Вид работ',
      },
      {
        name: 'Ед.изм.',
        id: 'Ед.изм.',
      },
      {
        name: 'Цена, руб.',
        id: 'kapremont-63.ru',
        attributes: {
          class: 'text-end',
        },
      },
    ],
  }).render(priceElement);
}

document.addEventListener('DOMContentLoaded', initGrid);
