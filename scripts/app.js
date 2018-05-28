'use strict';

var app = app || {};

(function(module) {
  let productionApiUrl = 'https://badmovietonight.herokuapp.com/';
  let developmentApiUrl = 'http://localhost:3000';

  module.isProduction = window.location.protocol === 'https';

  module.ENVIRONMENT = {
    apiUrl: module.isProduction ? productionApiUrl : developmentApiUrl
  };

  // Helper function to show only selected section of index.html
  module.showOnly = (section) => {
    $('.container').hide();
    $(section).show();
  };

  module.toggleMenu = () => {
    $('nav ul').toggle();
  }

  module.render = (templateId, data) => {
    let template = Handlebars.compile($(`#${templateId}`).text());
    return template(data);
  };

})(app);
