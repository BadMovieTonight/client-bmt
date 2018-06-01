'use strict';

page('/', () => {
  delete app.Movie.page;
  delete app.Movie.totalPages;
  app.hideMenu();
  app.userView.scrollToTop();
  app.showOnly('#movie-list');
  $('#search').val('');
  app.Movie.fetchAll(app.movieView.initIndexPage);
});

page('/client-bmt', () => page('/'));

page('/menu', () => {
  app.toggleMenu();
});

page('/signup', () => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.showOnly('#new-user');
  app.User.newUser();
});

page('/login', () => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.showOnly('#login');
  app.userView.userLogin();
});

page('/logout', () => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.User.current = null;
  $('.fav-menu').hide();
  app.userView.toggleUserView();
  console.log('page /logout',`${app.ENVIRONMENT.apiUrl}/logout`);
  $.get(`${app.ENVIRONMENT.apiUrl}/logout`);
  page('/');
});

page('/profile', () => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.showOnly('#user-profile');
  app.userView.initProfilePage();
});

page('/editPreferences', ()=> {
  app.hideMenu();
  app.userView.scrollToTop();
  app.userView.editPreferences();
});

page('/addToFavs/:id', (ctx) => {
  app.hideMenu();
  console.log('adding id', ctx.params.id,'to favorites');
  app.User.addToFavorites(ctx);
});

page('/removeFromFavs/:id', (ctx) => {
  app.hideMenu();
  console.log('removing id', ctx.params.id,'from favorites');
  app.User.removeFromFavorites(ctx);
});

page('/favorites', () => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.showOnly('#movie-list');
  app.movieView.initFavoritesPage();
});

page('/search', (ctx) => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.movieView.handleGeneralSearch(ctx);
});

page('/search/:page', (ctx) => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.movieView.handleGeneralSearch(ctx);
});

page('/movies/:actor', (ctx) => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.movieView.viewBadFilmography(ctx.params.actor);
});

page('/credits/:movieId', (ctx) => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.movieView.viewCredits(ctx.params.movieId);
});

page('/bmt/person/:id', (ctx) => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.movieView.getPersonDetail(ctx);
});

page('/showTrailer/:movieId', (ctx) => {
  app.hideMenu();
  $(`.videoWrapper[id="video-${ctx.params.movieId}"]`).toggle();
});

page('/about', () => {
  app.hideMenu();
  app.userView.scrollToTop();
  app.showOnly('#about-us');
  app.Developer.initAboutPage();
});

page();