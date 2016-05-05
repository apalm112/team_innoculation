(function(module) {
  var aboutController = {
    index: function() {
      console.log('working');
      $('#map-container').hide();
      $('#home-container').hide();
    }
  };
  module.aboutController = aboutController;
})(window);
