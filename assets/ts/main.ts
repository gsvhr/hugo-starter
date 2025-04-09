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
  if (!data.length) {
    document.getElementById('price').innerHTML = '<p>Нет данных для отображения</p>';
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
  }).render(document.getElementById('price'));
}

document.addEventListener('DOMContentLoaded', initGrid);
