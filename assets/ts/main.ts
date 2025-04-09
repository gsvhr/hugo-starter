import { Grid } from 'gridjs';

async function getData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Ошибка на сервере');
    const data = await response.json();
    return data.data;
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
        id: 'section',
        attributes: {
          class: 'w-50',
        },
      },
      {
        name: 'Наименование работ',
        id: 'work_type',
      },
      {
        name: 'Ед.изм.',
        id: 'unit',
      },
      {
        name: 'Цена, руб.',
        id: 'price',
        attributes: {
          class: 'text-end',
        },
      },
    ],
  }).render(document.getElementById('price'));
}

document.addEventListener('DOMContentLoaded', initGrid);
