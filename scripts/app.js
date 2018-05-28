'use strict';

var app = app || {};

(function(module) {

  // Helper function to show only selected section of index.html
  module.showOnly = (section) => {
    $('.container').hide();
    $(section).show();
  };

  module.toggleMenu = () => {
    $('nav ul').slideToggle();
  }

})(app)