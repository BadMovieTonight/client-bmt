'use strict';

var app = app || {};

(function(module) {

  const userView = {};

  //Function that toggles elements on/off based on if a user is logged in

  module.userView = userView;
})(app);

$('#login-form').on('submit', function(e) {
  e.preventDefault();
  let user = {
    username: $('#username').val(),
    password: $('#password').val(),
  };
  $.get(`${app.ENVIRONMENT.apiUrl}/login/${user.username}`)
    .then(dbuser => dbuser ? app.User.verify(dbuser, user.password) : alert('User does not exist'))
    .catch(console.error());
});