import { renderPage, appConfig } from "./api.js";

const LIST_FILM = './films-list.js',
      DETAILS_FILM = './film-details.js',
      BOOTSTRAP = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
      URL = 'https://swapi.dev/api/films/';

app.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.href) {
    history.pushState(null, '', event.target.getAttribute('href'))

    const searchParams = new URLSearchParams(location.search);
    const filmId = searchParams.get('search');

    startApp()
  }
});

window.addEventListener('popstate', event => {
  startApp()
});


function startApp() {
  const searchParams = new URLSearchParams(location.search);
  const filmId = searchParams.get('search');

  const app = document.getElementById('app');

  if (filmId) {
    renderPage(appConfig.DETAILS_FILM, `${appConfig.URL}${filmId}`, appConfig.BOOTSTRAP, app);
  } else {
    renderPage(appConfig.LIST_FILM, appConfig.URL, appConfig.BOOTSTRAP, app);
  }
}

startApp()
