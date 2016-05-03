(function(module) {
  var homeController = {
    index: function() {
      console.log('working');
      $('#map-container').hide();
      $('#home-container').show();
    }
  };
  module.homeController = homeController;
})(window);
