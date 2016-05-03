(function(module) {
  var mapController = {};

  mapController.index = function(ctx, next) {
    initMap();
    $('#home-container').hide();
    $('#map-container').show();
    $('#chart-template').show();
    // next();
  };

  mapController.loadMap = function(ctx, next) {
    console.log('working');

    next();
  };

  module.mapController = mapController;
})(window);
