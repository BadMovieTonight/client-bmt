'use strict';

var app = app || {};

(function(module){

  function Developer(name, bio, worst_movie, img_path) {
    this.name = name;
    this.bio = bio;
    this.worst_movie = worst_movie;
    this.img_path = `${app.ENVIRONMENT.imgPrefix}${img_path}`;
    Developer.all.push(this);
  }

  Developer.all = [];

  new Developer('Paul Ritzman', 'Paul has a background in Information Security and Computer Forensics. Seeking the opportunity to create tomorrow\'s technology, he opted to pursue development and continues to broaden his skills daily. In June, Paul will be starting the ASP.NET Core track with the intent of working on large-scale software solutions in the near future.', 'Willy Wonka & the Chocolate Factory', 'bio-imgs/paul.jpg');

  new Developer('Tracy Williams', 'Tracy Williams comes to Code Fellows from a long history of jobs both in and out of tech. Tracy graduated from the University of Washington in 1981 with a bachelor\'s in Computer Science with a focus on data structures. Since then he\'s worked as a software engineer, field applications engineer, and sales rep, and has filled various management roles up to VP Engineering &amp; Quality. When he\'s not coding, Tracy enjoys spending time with his wife, Kim, riding one of his two motorcycles, or hanging out at his cabin in the Gifford Pinchot National Forest.', 'Battlefield Earth', 'bio-imgs/tracy.jpg');

  new Developer('Jennifer Lawrence', 'Hi there! My name is Jenny and I am currently working towards becoming a full-stack JavaScript developer. I have a background in non-profit/social work. I hope to be able to create dynamic and beautiful web pages for my clients, as well as volunteer my skills for local non-profits.', 'Mac and Me', 'bio-imgs/jenny.jpg');

  new Developer('Benjamin Taylor', 'Hi, I’m Ben, and I am a JavaScript developer with prior experience in Python, Java, C#. I am currently planning on taking the C# 401 course at Code Fellows.', 'Life’s A Jungle: Africa’s Most Wanted', 'bio-imgs/benjamin.jpg');

  Developer.prototype.toHtml = function() {
    return Handlebars.compile($('#about-us-template').text())(this);
  };

  Developer.initAboutPage = function() {
    let $aboutUs = $('#about-us');
    $aboutUs.empty();

    Developer.all.forEach(elem => {$aboutUs.append(elem.toHtml());});
  };

  module.Developer = Developer;
})(app);