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

//logout route doesnt work for some reason
page('/logout', () => {
  app.User.current = null;
  app.userView.toggleUserView();
  page('/');
});

page('/search', (ctx) => app.movieView.handleGeneralSearch(ctx));

page('/signup', () => app.showOnly('#new-user'));

page();