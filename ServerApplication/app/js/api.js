const cssPromises = {};

const appConfig = {
  'LIST_FILM': './films-list.js',
  'DETAILS_FILM': './film-details.js',
  'BOOTSTRAP': 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
  'URL': 'https://swapi.dev/api/films/'
}

function loadResource(src) {
  // JS Module
  if (src.endsWith('.js')) {
    return import(src);
  }

  // CSS
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const $link = document.createElement('link');
      $link.rel = 'stylesheet';
      $link.href = src;
      cssPromises[src] = new Promise(resolve => {
        $link.addEventListener('load', () => resolve());
      });
      document.head.append($link);
    }
    return cssPromises[src];
  }

  // Data server
  return fetch(src).then(res => res.json());
}

function renderPage(moduleName, apiUrl, css, container) {
  Promise.all([moduleName, apiUrl, css]
    .map(src => loadResource(src)))
    .then(([pageModule, data]) => {
      container.innerHTML = '';
      container.append(pageModule.render(data));
  });
}

function renderList(urlList, name, container, onCreate) {
  Promise.all(urlList
    .map(url => fetch(url).then(res => res.json())))
    .then(data => {
      container.append(onCreate(data, name));
  })
}

export { renderPage, renderList, loadResource, appConfig};
