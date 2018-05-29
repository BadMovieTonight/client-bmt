'use strict';


page('/', () => {
  delete app.Movie.page;
  delete app.Movie.totalPages;
  app.toggleMenu();
  app.showOnly('#movie-search');
  app.Movie.fetchAll(app.movieView.initIndexPage);
});

page('/client-bmt', () => page('/'));

page('/menu', ctx => {
  app.toggleMenu();
});

page('/login', () => app.showOnly('#login'));

page('/search/:page', (ctx) => app.movieView.handleGeneralSearch(ctx));

page('/credits/:movieId', (ctx) => console.log('credits for movie', ctx.params.movieId));

page();