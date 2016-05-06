(function(module) {
  var homeController = {
    index: function(ctx, next) {
      $('#map-container').hide();
      $('#home-container').show();
      $('#about-container').hide();
      $('.loading').hide();
      next();
    }
  };
  module.homeController = homeController;
})(window);
