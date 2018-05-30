'use strict';

var app = app || {};

(function(module) {

  function Movie(movieObject){
    Object.keys(movieObject).forEach(key => this[key] = movieObject[key]);
  }

  Movie.all = [];

  Movie.prototype.toHtml = function() {
    if (!this.media_type || this.media_type === 'movie') {
      return Handlebars.compile($('#movie-list-template').text())(this);
    } else if (this.media_type === 'person') {
      return Handlebars.compile($('#movie-list-person-template').text())(this);
    }
  };

  Movie.loadAll = movieData => {Movie.all = movieData.map(movieObj => new Movie(movieObj));};

  Movie.fetchAll = (callback) => {
    $.get(`${app.ENVIRONMENT.apiUrl}/homepage`)
      .then(response => {
        Movie.loadAll(response.results);
        // app.Movie.page = response.page;
        // app.Movie.totalPages = response.total_pages;
        callback();
      })
      .catch(err => console.log('that didn\'t work'));
  };

  module.Movie = Movie;
})(app);