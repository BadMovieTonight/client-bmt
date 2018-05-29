'use strict';


page('/', () => {
  app.showOnly('#movie-search');
  app.Movie.fetchAll(app.movieView.initIndexPage);
});

page('/about', () => {
  app.showOnly('#about-us');
});

page('/client-bmt', () => page('/'));

page('/login', () => app.showOnly('#login'));

page('/menu', ctx => {
  app.toggleMenu();
});

page('/search', (ctx) => app.movieView.handleGeneralSearch(ctx));

page();