'use strict';

var app = app || {};

(function(module){

  function User(userObject) {
    Object.keys(userObject).forEach(key => this[key] = userObject[key]);
  }

  User.current;

  User.verify = function(user, password) {
    if (password === user.password) {
      User.current = new User(user);
      page('/');
    }
  };

  module.User = User;
})(app);