'use strict';

var app = app || {};

(function(module) {

  const movieView = {};

  movieView.initIndexPage = function() {
    // $('.fav-star').hide();
    let $movieList = $('#movie-list');
    $movieList.empty();
    app.Movie.getImages();
    app.Movie.all.forEach(elem => {$movieList.append(elem.toHtml());});
    app.movieView.initFavStar();
    movieView.addPageNavFooter();
  };

  movieView.initFavStar = function() {
    if (app.User.current) { // then we have a logged in user
      $('.fav-menu').show(); // show the favorites menu item
      $('.not-fav').show(); // show all the empty (not fav) stars
      // map user's favorite movie id's to a new array
      let userMovieIds = app.User.current.preferences.favorites.map(m => parseInt(m.id));
      // loop through displayed movies and compare id with userMovieIds
      app.Movie.all.forEach(m => {
        if (userMovieIds.includes(m.id)) {
          $(`#not-fav-${m.id}`).hide();
          $(`#fav-${m.id}`).show();
        }
      });

      //   if app.Movie.all contains the favorite's move ID
      //      make full star visible
      //   otherwise make empty star visible
    }
  };

  movieView.initFavoritesPage = () => {
    console.log('initFavoritesPage');
    // point Movie.all to current user's favorites list
    app.Movie.all = [];
    let favs = app.User.current.preferences.favorites;
    favs.forEach(fav => app.Movie.all.push(new app.Movie(fav)));
    let $movieList = $('#movie-list');
    $movieList.empty();
    app.Movie.all.forEach(elem => {$movieList.append(elem.toHtml());});
    app.movieView.initFavStar();
  };

  movieView.addPageNavFooter = function(){
    if (app.Movie.page){
      let randomSearch = $('#search').val() === '';
      console.log(randomSearch);
      let pageView = `<p class="page-nav-footer">`;
      pageView += ` Page ${app.Movie.page} of ${app.Movie.totalPages} `;
      if (randomSearch) {
        pageView += `<a href="/">Next random page</a>`;
      } else {
        if (app.Movie.page > 1) {
          pageView += `<a href="/search/{app.Movie.page - 1}">Prev <span class="icon-arrow-left"</span></a>`;
        } else {
          pageView += `Prev <span class="icon-arrow-left"></span>`;
        }
        if (app.Movie.page < app.Movie.totalPages) {
          pageView += ` <a href="/search/${app.Movie.page + 1}"><span class="icon-arrow-right"></span> Next</a>`;
        } else {
          pageView += ` <span class="icon-arrow-right"></span> Next`;
        }
      }
      pageView += `<p>`;

      $('#movie-list').append(pageView);
    }
  };

  movieView.initTinyPeoplePage = function() {
    let $movieList = $('#movie-list');
    $movieList.empty();
    app.showOnly('#movie-list');
    app.Movie.getImages();
    let template = Handlebars.compile($('#movie-tiny-person-template').text());
    app.Movie.all.forEach(p =>
      $('#movie-list').append(template(p)));
    movieView.addPageNavFooter();
  };

  movieView.handleGeneralSearch = function(ctx) {
    // console.log(ctx);
    let search = $('#search').val();
    let searchType = $('#search-type').val();
    console.log('search string', search);
    console.log('search drop down', searchType);
    if (searchType === 'person'){
      movieView.searchPeople(ctx, search);
    } else {
      movieView.searchMovies(ctx, search);
    }
  };

  movieView.searchPeople = function (ctx, search){
    console.log('search people', search);
    $.get(`${app.ENVIRONMENT.apiUrl}/bmt/person`,
      {searchFor: $('#search').val(),
        page: parseInt(ctx.params.page)
      })
      .then(response => {
        console.log('search returned',response.results);
        app.Movie.all = response.results
          .map(o => new app.Movie(o));
        app.Movie.all.map(o => o.media_type='person');
        app.Movie.page = response.page;
        app.Movie.totalPages = response.total_pages;
        console.log(app.Movie.all);
        console.log('Page',response.page,'of',response.total_pages);
        movieView.initTinyPeoplePage();
      })
      .catch(err => console.log('that didn\'t work'));
  };

  movieView.getPersonDetail = function(ctx){
    $.get(`${app.ENVIRONMENT.apiUrl}/bmt/person/${ctx.params.id}`)
      .then(response => {
        console.log('search returned',response.results);
        app.Movie.all = response.results
          .map(o => new app.Movie(o));
        app.Movie.all.map(o => o.media_type='person');
        app.Movie.page = response.page;
        app.Movie.totalPages = response.total_pages;
        console.log(app.Movie.all);
        console.log('Page',response.page,'of',response.total_pages);
        movieView.initIndexPage();
      })
      .catch(err => console.log('that didn\'t work'));
  };

  movieView.searchMovies = function (ctx, search){
    console.log('search movies', search);
    $.get(`${app.ENVIRONMENT.apiUrl}/bmt/movies`,
      {searchFor: $('#search').val(),
        page: parseInt(ctx.params.page)
      })
      .then(response => {
        console.log('search returned',response.results);
        app.Movie.all = response.results
          .filter(o => o.vote_average < 5)
          .map(o => new app.Movie(o));
        app.Movie.page = response.page;
        app.Movie.totalPages = response.total_pages;
        console.log(app.Movie.all);
        console.log('Page',response.page,'of',response.total_pages);
        movieView.initIndexPage();
      })
      .catch(err => console.log(err));
  };

  movieView.viewBadFilmography = function(actor) {
    $.get(`${app.ENVIRONMENT.apiUrl}/movies/${actor}`)
      .then(response => {
        app.Movie.all = response.results.map(o => new app.Movie(o));
        app.Movie.page = response.page;
        app.Movie.totalPages = response.total_pages;
        movieView.initIndexPage();
      }).catch(console.error);
  };

  movieView.viewCredits = function(movieId) {
    $.get(`${app.ENVIRONMENT.apiUrl}/credits/${movieId}`)
      .then(response => {
        console.log(response);
        app.Movie.all = response.cast.map(o => new app.Movie(o));
        app.Movie.all.map(o => o.media_type='person');
        app.Movie.page = response.page;
        app.Movie.totalPages = response.total_pages;
        movieView.initTinyPeoplePage();
      });
  };

  module.movieView = movieView;
})(app);