'use strict';

var app = app || {};

(function(module) {
  let productionApiUrl = 'https://badmovietonight.herokuapp.com';
  let developmentApiUrl = 'http://localhost:3000';
  let productionImgPrefix = '/client-bmt/';
  let developmentImgPrefix = '/';

  module.isProduction = window.location.protocol === 'https:';

  module.ENVIRONMENT = {
    apiUrl: module.isProduction ? productionApiUrl : developmentApiUrl,
    imgPrefix: module.isProduction ? productionImgPrefix : developmentImgPrefix
  };

  module.tmdbImagePath = 'https://image.tmdb.org/t/p/w200_and_h300_bestv2';

  module.placeholder = `${module.ENVIRONMENT.imgPrefix}bio-imgs/no-image.png`;

  // Helper function to show only selected section of index.html
  module.showOnly = (section) => {
    $('.container').hide();
    $(section).show();
  };

  module.toggleMenu = () => {
    $('nav ul').toggle();
  };

  module.hideMenu = () => $('nav ul').hide();

  module.showMenu = () => $('nav ul').show();

  module.render = (templateId, data) => {
    let template = Handlebars.compile($(`#${templateId}`).text());
    return template(data);
  };

  module.getNow = () => {
    let d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;
  };
  
})(app);
