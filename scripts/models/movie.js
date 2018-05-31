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

  Movie.loadAll = movieData => {
    Movie.all = movieData.map(movieObj => new Movie(movieObj));
  };

  Movie.getImages = () => {
    Movie.all.forEach(movieObj => {
      if (movieObj.poster_path) {
        movieObj.poster_path = app.tmdbImagePath + movieObj.poster_path;
      } else if (movieObj.profile_path) {
        movieObj.profile_path = app.tmdbImagePath + movieObj.profile_path;
      } else {
        movieObj.profile_path = app.placeholder;
        movieObj.poster_path = app.placeholder;
      }
    });
  };

  Movie.fetchAll = (callback) => {
    let randPage = Math.floor(Math.random() * 50) + 1;
    $.get(`${app.ENVIRONMENT.apiUrl}/homepage/${randPage}`)
      .then(response => {
        Movie.page = response.page;
        Movie.totalPages = response.total_pages;
        Movie.loadAll(response.results);
        callback();
      })
      .catch(err => console.log(err));
  };

  module.Movie = Movie;
})(app);