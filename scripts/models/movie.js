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

  Movie.fetchAll = () => {
    $.get(`${app.ENVIRONMENT.server_url}/homepage`)
      .then(response => console.log(response))
      .catch(err => console.log('that didn\'t work'));
  };

  module.Movie = Movie;
})(app);