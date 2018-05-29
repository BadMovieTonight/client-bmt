'use strict';

var app = app || {};

(function(module) {

  const movieView = {};

  movieView.initIndexPage = function() {
    let $movieList = $('#movie-list');
    $movieList.empty();
    app.showOnly('#movie-list');

    app.Movie.all.forEach(elem => {$movieList.append(elem.toHtml());});
  };

  movieView.handleGeneralSearch = function(ctx) {
    console.log(ctx);
    console.log($('#search').val());
    $.get(`${app.ENVIRONMENT.apiUrl}/bmt/search`,
    {searchFor: $('#search').val()})
      .then(response => {
        // console.log(response.results);
        // response.results.forEach(resObj => {
        //   console.log(resObj.media_type, resObj.title);
        // });
        app.Movie.all = response.results
          .filter(o => o.media_type === 'movie')  // an array of movies
          .map(o => new app.Movie(o));
        console.log(app.Movie.all);
        movieView.initIndexPage();
        // callback();
      })
      .catch(err => console.log('that didn\'t work'));
  }

  module.movieView = movieView;
})(app);