'use strict';

page('/', () => {
  delete app.Movie.page;
  delete app.Movie.totalPages;
  app.hideMenu();
  app.showOnly('#movie-list');
  $('#search').val('');
  app.Movie.fetchAll(app.movieView.initIndexPage);
  app.userView.scrollToTop();
});

page('/client-bmt', () => page('/'));

page('/menu', () => {
  app.toggleMenu();
});

page('/signup', () => {
  app.hideMenu();
  app.showOnly('#new-user');
  app.User.newUser();
});

page('/login', () => {
  app.hideMenu();
  app.showOnly('#login');
  app.userView.userLogin();
});

page('/logout', () => {
  app.User.current = null;
  $('.fav-menu').hide();
  app.userView.toggleUserView();
  console.log('page /logout',`${app.ENVIRONMENT.apiUrl}/logout`);
  $.get(`${app.ENVIRONMENT.apiUrl}/logout`);
  page('/');
});

page('/profile', () => {
  app.hideMenu();
  app.showOnly('#user-profile');
  app.userView.initProfilePage();
});

page('/editPreferences', ()=> {
  app.hideMenu();
  app.userView.editPreferences();
});

page('/addToFavs/:id', (ctx) => {
  console.log('adding id', ctx.params.id,'to favorites');
  app.User.addToFavorites(ctx);
});

page('/removeFromFavs/:id', (ctx) => {
  console.log('removing id', ctx.params.id,'from favorites');
  app.User.removeFromFavorites(ctx);
});

page('/favorites', () => {
  app.hideMenu();
  app.movieView.initFavoritesPage();
});

page('/search', (ctx) => app.movieView.handleGeneralSearch(ctx));

page('/search/:page', (ctx) => {
  app.userView.scrollToTop();
  app.movieView.handleGeneralSearch(ctx);
});

page('/movies/:actor', (ctx) => app.movieView.viewBadFilmography(ctx.params.actor));

page('/credits/:movieId', (ctx) => {
  app.movieView.viewCredits(ctx.params.movieId);
  app.userView.scrollToTop();
});

page('/bmt/person/:id', (ctx) => app.movieView.getPersonDetail(ctx));

page('/about', () => {
  app.showOnly('#about-us');
  app.Developer.initAboutPage();
});

page();