'use strict';

var app = app || {};

(function(module) {

  function Movie(movieObject){
    Object.keys(movieObject).forEach(key => this[key] = movieObject[key]);
  }

  Movie.all = [];

  Movie.prototype.toHtml = function() {
    let template;
    if (!this.media_type || this.media_type === 'movie') {
      template = $('#movie-list-template').text();
    } else if (this.media_type === 'person') {
      template = $('#movie-list-person-template').text();
    }
    return Handlebars.compile(template)(this);
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