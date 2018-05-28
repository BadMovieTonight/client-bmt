'use strict';

var app = app || {};

(function(module) {

  function Movie(movieObject){
    Object.keys(movieObject).forEach(key => this[key] = movieObject[key]);
  }

  Movie.all = [];

  Movie.prototype.toHtml = function() {
    let template = Handlebars.compile($('#movie-list-template').text());
    return template(this);
  };

  Movie.loadAll = movieData => {Movie.all = movieData.map(movieObj => new Movie(movieObj));};

  Movie.fetchAll = (callback) => {
    $.get(`${app.ENVIRONMENT.apiUrl}/homepage`)
      .then(response => {
        Movie.loadAll(response.results);
        callback();
      })
      .catch(err => console.log('that didn\'t work'));
  };

  module.Movie = Movie;
})(app);