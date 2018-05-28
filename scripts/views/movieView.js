'use strict';

var app = app || {};

(function(module) {

  const movieView = {};

  movieView.initIndexPage = function() {
    let $movieList = $('#movie-list');
    $movieList.empty();
    app.showOnly('#movie-list');

    app.Movie.all.forEach(elem => {$movieList.append(elem.toHtml);});
  };

  module.movieView = movieView;
})(app);