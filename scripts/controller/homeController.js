(function(module) {
  var homeController = {
    index: function() {
      console.log('working');
      $('#map-elements').hide();
      $('#home-container').show();
    }
  };
  module.homeController = homeController;
})(window);
