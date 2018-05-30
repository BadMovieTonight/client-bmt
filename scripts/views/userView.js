'use strict';

var app = app || {};

(function(module) {

  const userView = {};

  //Function that toggles elements on/off based on if a user is logged in.
  userView.toggleUserView = function() {
    $('a[href="/login"]').toggle();
    $('a[href="/logout"]').toggle();
    $('a[href="/signup"]').toggle();
    $('a[href="/profile"]').toggle();
  };

  module.userView = userView;
})(app);

$('#login-form').on('submit', function(e) {
  e.preventDefault();
  let user = {
    username: $('#username').val(),
    password: $('#password').val(),
  };
  app.User.getUser(user, app.User.verify, function(){alert('User does not exist')});
});