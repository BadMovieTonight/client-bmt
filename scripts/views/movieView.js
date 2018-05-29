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
    // console.log(ctx);
    console.log('search string',$('#search').val());
    $.get(`${app.ENVIRONMENT.apiUrl}/bmt/search`,
    {searchFor: $('#search').val()})
      .then(response => {
        console.log('search returned',response.results);
        app.Movie.all = response.results
          .filter(o => o.media_type === o.media_type) //'movie')  // an array of movies
          .map(o => new app.Movie(o));
        console.log(app.Movie.all);
        console.log('Page',response.page,'of',response.total_pages);
        movieView.initIndexPage();
        // callback();
      })
      .catch(err => console.log('that didn\'t work'));
  }

  module.movieView = movieView;
})(app);