(function(module) {
  var homeController = {
    index: function(ctx, next) {
      console.log('working');
      $('#map-container').hide();
      $('#home-container').show();
      $('#about-container').hide();
      $('.loading').hide();
      next();
    }
  };
  module.homeController = homeController;
})(window);
