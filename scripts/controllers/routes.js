'use strict';


page('/', () => {
  app.showOnly('#movie-search');
  app.Movie.fetchAll(app.movieView.initIndexPage);
});

page('/client-bmt', () => page('/'));

page('/menu', ctx => {
  app.toggleMenu();
});

page('/login', () => app.showOnly('#login'));

page('/search', (ctx) => app.movieView.handleGeneralSearch(ctx));

page();