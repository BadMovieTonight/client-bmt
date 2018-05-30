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

  userView.userLogin = function() {
    $('#login-form').on('submit', function(e) {
      e.preventDefault();
      $('#login-form').off('submit');
      let user = {
        username: $('#username').val(),
        password: $('#password').val(),
      };
      app.User.getUser(user, app.User.verify, function(){alert('User does not exist');});
    });
  };

  userView.initProfilePage = function() {
    let $userProfile = $('#user-profile');
    $userProfile.empty();
    $userProfile.append(app.User.current.toHtml());
  };

  module.userView = userView;
})(app);