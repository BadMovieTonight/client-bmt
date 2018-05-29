'use strict';

var app = app || {};

(function(module) {

  const movieView = {};

  movieView.initIndexPage = function() {
    let $movieList = $('#movie-list');
    $movieList.empty();
    app.showOnly('#movie-list');

    app.Movie.all.forEach(elem => {$movieList.append(elem.toHtml());});

    if (app.Movie.page){
      let pageView = `<p>`;
      if (app.Movie.page > 1) {
        pageView += `<a href= "/search/${app.Movie.page - 1}">⬅️ Prev</a>`;
      }
      pageView += ` Page ${app.Movie.page} of ${app.Movie.totalPages}`;
      if (app.Movie.page < app.Movie.totalPages) {
        pageView += `<a href= "/search/${app.Movie.page + 1}">➡️ Next</a>`;
      }
      pageView += `<p>`;

      $('#movie-list').append(pageView);
    }
  };

  movieView.handleGeneralSearch = function(ctx) {
    // console.log(ctx);
    console.log('search string',$('#search').val());
    $.get(`${app.ENVIRONMENT.apiUrl}/bmt/search`,
      {searchFor: $('#search').val(),
        page: parseInt(ctx.params.page)
      })
      .then(response => {
        console.log('search returned',response.results);
        app.Movie.all = response.results
          .map(o => new app.Movie(o));
        app.Movie.page = response.page;
        app.Movie.totalPages = response.total_pages;
        console.log(app.Movie.all);
        console.log('Page',response.page,'of',response.total_pages);
        movieView.initIndexPage();
        // callback();
      })
      .catch(err => console.log('that didn\'t work'));
  };

  module.movieView = movieView;
})(app);