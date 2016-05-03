(function(module) {
  var homeController = {
    index: function() {
      console.log('working');
      $('#home-container').show();
    }
  };
  module.homeController = homeController;
})(window);
