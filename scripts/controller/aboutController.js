(function(module) {
  var aboutController = {
    index: function(ctx, next) {
      console.log('working');
      $('#map-container').hide();
      $('#home-container').hide();
      next();
    }
  };
  module.aboutController = aboutController;
})(window);
