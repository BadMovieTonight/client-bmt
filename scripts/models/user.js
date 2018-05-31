'use strict';

var app = app || {};

(function(module){

  function User(userObject) {
    Object.keys(userObject).forEach(key => this[key] = userObject[key]);
    if (this.preferences) {this.preferences = JSON.parse(this.preferences);}
  }

  User.current;
  User.dbuser;
  User.test;

  //Function that adds the default filters if none present
  User.prototype.setDefaultPrefs = function() {
    this.preferences = JSON.stringify({
      maxrating: 4,
      minratings: 25,
      maxdate: app.getNow(),
      mindate: '1970-01-01',
      sortby: 'rating',
      favorites: []
    });
  };

  //Function that updates the filters on form update
  User.prototype.updatePrefs = function() {

  };

  //Function that updates the database
  User.prototype.updateUser = function() {
    $.ajax({
      url: `${app.ENVIRONMENT.apiUrl}/users/update`,
      method: 'PUT',
      data: {
        id: this.id,
        username: this.username,
        password: this.password,
        preferences: JSON.stringify(this.preferences),
      }
    }).then(() => console.log('Updated database for',this.username))
      .catch(console.error);
  };

  //Function that adds a user to the database
  User.prototype.addUser = function() {
    this.setDefaultPrefs();
    $.ajax({
      url: `${app.ENVIRONMENT.apiUrl}/users/new`,
      method: 'POST',
      data: {
        username: this.username,
        password: this.password,
        preferences: this.preferences
      }
    }).then(() => {
      alert('User created');
      app.toggleMenu();
      page('/');
    }).catch(console.error);
  };

  //Function that removes a user from the database
  User.prototype.removeUser = function() {
    $.ajax({
      url: `${app.ENVIRONMENT.apiUrl}/users/remove/${this.id}`,
      method: 'DELETE'
    }).catch(console.error);
  };

  User.prototype.toHtml = function() {
    return Handlebars.compile($('#user-pref-template').text())(this.preferences);
  };

  //Function that gets a user from the database
  User.getUser = function(userObject, truecallback, falsecallback) {
    $.get(`${app.ENVIRONMENT.apiUrl}/login/${userObject.username}`)
      .then(dbuser => {
        if (dbuser) {
          User.dbuser = dbuser;
          User.test = userObject;
          truecallback();
        } else falsecallback();
      })
      .catch(console.error());
  };

  //Refactor verify so that it doesn't need arguments
  User.verify = function() {
    if (User.test.password === User.dbuser.password) {
      User.current = new User(User.dbuser);
      if (!User.current.preferences) {
        User.current.setDefaultPrefs();
        User.current.updateUser();
      }
      // Make sure that the filters are populated with the user preferences.
      app.toggleMenu();
      page('/');
      app.userView.toggleUserView();
    } else alert('Incorrect password');
  };

  User.newUser = function() {
    $('#new-user-form').on('submit', function(e){
      e.preventDefault();
      $('#new-user-form').off('submit');
      let userObject = {
        username: $('#new-username').val(),
        password: $('#new-password').val()
      };

      //Logic that checks if there is a user in the database with the same username.
      app.User.getUser(userObject,
        function(){alert('User already exists');},
        function(){new app.User(userObject).addUser();}
      );
    });
  };

  User.addToFavorites = (ctx, next) => {
    // find index of movie with id = ctx.params.id
    let favMovie = app.Movie.all.filter(m => m.id === parseInt(ctx.params.id));
    console.log(favMovie);
    User.current.preferences.favorites.push(favMovie[0]);
    console.log('after push favs', User.current.preferences.favorites);
    $(`#not-fav-${ctx.params.id}`).hide();
    $(`#fav-${ctx.params.id}`).show();
    User.current.updateUser(); 
  }

  User.removeFromFavorites = (ctx) => {
    let notFavMovieIds = User.current.preferences.favorites.map(m => parseInt(m.id));
    let idx = notFavMovieIds.indexOf(ctx.params.id);
    User.current.preferences.favorites.splice(idx, 1);
    $(`#fav-${ctx.params.id}`).hide();
    $(`#not-fav-${ctx.params.id}`).show();
    User.current.updateUser();
  }

  module.User = User;
})(app);