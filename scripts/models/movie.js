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

  Movie.prototype.getTrailer = function() {
    console.log('getTrailer for',this.id);
    $.get(`${app.ENVIRONMENT.apiUrl}/movie/${this.id}/videos`)
      .then(response => {
        addTrailerUrlToMovie(response[0],this.id);
      })
      .catch(console.error);
  };

  let addTrailerUrlToMovie = (trailerObj, movieId) => {
    console.log('addTrailer to',movieId);
    let trailerAnchor = null;
    if (!trailerObj) {
      console.log('no trailer for',movieId);
      return;
    }
    if (trailerObj.site.toUpperCase() === 'YouTube'.toUpperCase()) {
      //https://www.youtube.com/watch?v=I9bHN15RO-4
      trailerAnchor = `<p><a href="https://www.youtube.com/watch?v=${trailerObj.key}" target="_blank">Trailer on Youtube</a></p>`;
    }
    if (trailerAnchor) {
      console.log('addTrailer: ',trailerAnchor);
      $(`div#${movieId}`).children().children().eq(5).after(trailerAnchor);
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
    let randPage = 1;
    $.get(`${app.ENVIRONMENT.apiUrl}/homepage/${randPage}`)
      .then(response => {
        Movie.totalPages = response.total_pages;
        randPage = Math.floor(Math.random() * Movie.totalPages) + 1;
        $.get(`${app.ENVIRONMENT.apiUrl}/homepage/${randPage}`)
          .then(response => {
            Movie.page = response.page;
            Movie.loadAll(response.results);
            callback();
          })
          .catch(err => console.log(err));
      });
  };

  module.Movie = Movie;
})(app);