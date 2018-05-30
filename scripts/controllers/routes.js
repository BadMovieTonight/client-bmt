'use strict';

page('/', () => {
  delete app.Movie.page;
  delete app.Movie.totalPages;
  app.toggleMenu();
  app.showOnly('#movie-list');
  app.Movie.fetchAll(app.movieView.initIndexPage);
});

page('/client-bmt', () => page('/'));

page('/menu', ctx => {
  app.toggleMenu();
});

page('/signup', () => {
  app.toggleMenu();
  app.showOnly('#new-user');
  app.User.newUser();
});

page('/login', () => {
  app.toggleMenu();
  app.showOnly('#login');
  app.userView.userLogin();
});

page('/logout', () => {
  app.User.current = null;
  app.userView.toggleUserView();
  page('/');
});

page('/profile', () => {
  app.toggleMenu();
  app.showOnly('#user-profile');
  app.userView.initProfilePage();
});

page('/addToFavs/:id',(ctx) => {
  console.log('adding id',ctx.params.id,'to favorites');
  app.User.addToFavorites(ctx)
});

page('/removeFromFavs/:id',(ctx) => {
  console.log('removing id',ctx.params.id,'from favorites');
  app.User.removeFromFavorites(ctx)
});

page('/search', (ctx) => app.movieView.handleGeneralSearch(ctx));

page('/search/:page', (ctx) => {
  $(document).scrollTop( $("#header").offset().top );
  app.movieView.handleGeneralSearch(ctx)
});

page('/movies/:actor', (ctx) => app.movieView.viewBadFilmography(ctx.params.actor));

page('/credits/:movieId', (ctx) => app.movieView.viewCredits(ctx.params.movieId));
//console.log('credits for movie', ctx.params.movieId));

page('/bmt/person/:id', (ctx) => app.movieView.getPersonDetail(ctx));

page('/about', () => {
  app.showOnly('#about-us');
  app.Developer.initAboutPage();
});

page();