'use strict';


page('/', () => {
  app.showOnly('#movie-search');
  app.Movie.fetchAll(app.movieView.initIndexPage);
});

page('/menu', ctx => {
  app.toggleMenu();
});

page('/login', () => app.showOnly('#login'));

page();