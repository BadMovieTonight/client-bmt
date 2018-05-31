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

  // Function that scrolls user to top of page (mainly used during page navigation).
  userView.scrollToTop = function() {
    $(document).scrollTop($('#header').offset().top);
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

  userView.editPreferences = function() {
    console.log('/editPreferences');
    app.showOnly('#edit-user-preferences');
    let uPrefs = app.User.current.preferences;
    $('#max-rating').val(uPrefs.maxrating);
    $('#min-ratings').val(uPrefs.minratings);
    $('#date-after').val(uPrefs.mindate);
    $('#edit-preferences-form').on('submit', (e) => {
      e.preventDefault();
      console.log('form submitted');
      $('#edit-preferences-form').off('submit');
      uPrefs.maxrating = $('#max-rating').val();
      uPrefs.minratings = $('#min-ratings').val();
      uPrefs.mindate = $('#date-after').val();
      app.User.current.updateUser(() => page('/'));
    });
  };

  module.userView = userView;
})(app);