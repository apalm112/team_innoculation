(function(module) {
  var aboutController = {
    index: function() {
      $('#map-container').hide();
      $('#home-container').hide();
      $('.loading').hide();
      $('#about-container').show();
    }
  };
  module.aboutController = aboutController;
})(window);
