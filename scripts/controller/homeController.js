(function(module) {
  var homeController = {
    index: function(ctx, next) {
      console.log('working');
      $('#map-elements').hide();
      $('#home-container').show();
      next();
    }
  };
  module.homeController = homeController;
})(window);
