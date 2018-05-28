'use strict';


page('/', () => app.showOnly('#movie-search'));

page('/menu', ctx => {
  app.toggleMenu();
});

page('/login', () => app.showOnly('#login'));

page();