'use strict';

var app = app || {};

(function(module){

  function User(userObject) {
    Object.keys(userObject).forEach(key => this[key] = userObject[key]);
  }

  //Function that adds the default filters if none present
  User.prototype.setDefaultFilters = function() {
    console.log('im run');
    this.preferences = JSON.stringify({
      maxrating: 4,
      minratings: 100,
      maxdate: new Date().toString(),
      mindate: 'Mon Jan 01 1900 00:00:00 GMT-0700 (PDT)',
      sortby: 'rating'
    });
  };

  //Function that updates the filters on form update
  User.prototype.updateFilters = function() {

  };

  //Function that updates the database
  User.prototype.updateUser = function() {
    console.log(this);
    $.ajax({
      url: `${app.ENVIRONMENT.apiUrl}/users/update`,
      method: 'PUT',
      data: {
        id: this.id,
        username: this.username,
        password: this.password,
        preferences: this.preferences,
      }
    }).then(() => console.log('did a thing'))
      .catch(console.error);
  };

  //Function that adds a user to the database
  User.prototype.addUser = function() {

  };

  //Function that removes a user from the database
  User.prototype.removeUser = function() {

  };

  User.current;

  User.verify = function(userObject, password) {
    if (password === userObject.password) {
      User.current = new User(userObject);
      if (!User.current.preferences) {
        User.current.setDefaultFilters();
        //I want to update the user in the database here, but calling User.current.updateUser() doesn't work.
        User.current.updateUser();
      }
      // Make sure that the filters are populated with the user preferences.
      page('/');
    } else alert('Incorrect password');
  };

  module.User = User;
})(app);

//Event listener for filter form change
$('#search-form').on('change', function(e) {

});