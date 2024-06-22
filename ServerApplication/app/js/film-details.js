import { renderList } from "./api.js";

const infoFilmsLists = ['planets', 'species'];

export function render(data) {
  const $container = document.createElement('div'),
        $header = document.createElement('h1'),
        $back = document.createElement('a'),
        $description = document.createElement('p');

  $container.classList.add('container');
  $back.classList.add('btn', 'btn-danger');
  $description.classList.add('mt-5');
  $description.style.width = '50%';

  $header.textContent = `${data.title}. Episode: ${data.episode_id}`;
  $description.textContent = data.opening_crawl;
  $back.textContent = 'Назад';
  $back.href = 'index.html';

  $container.append($header);
  $container.append($back);
  $container.append($description);

  for (const list of infoFilmsLists) {
    const name = `${list.slice(0, 1).toUpperCase() + list.slice(1)}`
    renderList(data[list], name, $container, createList)
  }

  return $container;
}

function createList(dataList, name) {
  const $container = document.createElement('div');
  const $header = document.createElement('h2');
  const $list = document.createElement('ul');

  $container.classList.add('mb-5');
  $list.classList.add('list-group', 'list-group-flush');
  $list.style.width = '50%';

  $header.textContent = name;

  for (const elem of dataList) {
    const $item = document.createElement('li');
    $item.classList.add('list-group-item');

    $item.textContent = elem.name;

    $list.append($item);
  }

  $container.append($header);
  $container.append($list);

  return $container;
}
