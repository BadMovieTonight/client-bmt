'use strict';

var app = app || {};

(function(module) {

  const userView = {};

  //Function that toggles elements on/off based on if a user is logged in.
  userView.toggleUserView = function() {
    let $user1 = $('#user1').children('a');
    let $user2 = $('#user2').children('a');
    console.log( $user1);
    if ($user1.attr('href') === '/login'){
      $user1.attr('href', '/logout').removeClass().addClass('icon-cross').text(' Sign Out');
      $user2.attr('href', '/profile').removeClass().addClass('icon-user-tie').text(' My Profile');
    } else {
      $user1.attr('href', '/login').removeClass().addClass('icon-key').text(' Sign In');
      $user2.attr('href', '/signup').removeClass().addClass('icon-pencil2').text(' New User');
    }
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