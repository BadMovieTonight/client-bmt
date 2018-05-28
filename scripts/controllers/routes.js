'use strict';

var app = app || {};

page('/', () => app.showOnly('#movie-search'));
page('/login', () => app.showOnly('#login'));

page();