(function(module) {
  var aboutController = {
    index: function() {
      console.log('working');
      $('#map-container').hide();
      $('#home-container').hide();
      $('#about-container').show();
    }
  };
  module.aboutController = aboutController;
})(window);
