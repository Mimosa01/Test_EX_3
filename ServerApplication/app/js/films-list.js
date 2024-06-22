export function render(data) {
  const $container = document.createElement('div');
  $container.classList.add(
    'conatiner',
    'd-flex',
    'flex-wrap',
    'py-4'
  )

  const listFilm = [...data.results];
  const sortedList = listFilm.sort((film1, film2) => film1['episode_id'] > film2['episode_id'] ? 1 : -1);

  for (const film of sortedList) {
    const $filmCard = document.createElement('div');
    const $cardBody = document.createElement('div');
    const $cardImg = document.createElement('img');
    const $cardHeader = document.createElement('h5');
    const $cardTitle = document.createElement('p');
    const $cardLink = document.createElement('a');

    $filmCard.style.width = '18rem';
    $filmCard.classList.add('card', 'my-2', 'mx-1');
    $cardImg.classList.add('card-img-top');
    $cardImg.src = 'img/starwars.png';
    $cardImg.alt = film.title;
    $cardBody.classList.add('card-body');
    $cardHeader.classList.add('card-title');
    $cardTitle.classList.add('card-text');
    $cardLink.classList.add('btn', 'btn-primary');

    $cardBody.append($cardHeader);
    $cardBody.append($cardTitle);
    $cardBody.append($cardLink);
    $filmCard.append($cardImg);
    $filmCard.append($cardBody);

    $cardHeader.textContent = film.title;
    $cardTitle.textContent = `Эпизод: ${film.episode_id}`;
    $cardLink.textContent = 'Подробнее';
    $cardLink.href = `?search=${data.results.indexOf(film) + 1}`

    $container.append($filmCard);
  }

  return $container;
}
