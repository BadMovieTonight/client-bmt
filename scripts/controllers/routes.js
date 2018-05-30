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

page('/signup', () => app.showOnly('#new-user'));

page('/login', () => app.showOnly('#login'));

page('/logout', () => {
  app.User.current = null;
  app.userView.toggleUserView();
  page('/');
});

page('/search', (ctx) => app.movieView.handleGeneralSearch(ctx));

page('/search/:page', (ctx) => app.movieView.handleGeneralSearch(ctx));

page('/movies/:actor', (ctx) => app.movieView.viewBadFilmography(ctx.params.actor));

page('/credits/:movieId', (ctx) => app.movieView.viewCredits(ctx.params.movieId));
//console.log('credits for movie', ctx.params.movieId));

page('/bmt/person/:id', (ctx) => app.movieView.getPersonDetail(ctx));

page('/about', () => {
  app.showOnly('#about-us');
  app.Developer.initAboutPage();
});

page();