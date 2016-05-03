(function(module) {
  var mapController = {};

  mapController.index = function(ctx, next) {

    var schoolId, allLatLng, allMarkers, schoolName = [];

    var latLng = {
      lat: parseFloat(ctx.params.lat),
      lng: parseFloat(ctx.params.lng)
    };

    initMap(latLng);
    console.log(latLng);
    //need to add schools as a parameter
    $('#home-container').hide();
    $('#map-container').show();
    next();
  };

  mapController.findSchools = function(ctx, next) {

    var ref = new Firebase('https://intense-heat-7080.firebaseio.com/');

    ref.on('value', function(snapshot) {
      console.log(snapshot.val());
      next();
    }, function(errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
  };

  mapController.renderSchools = function(ctx, next) {

    console.log('works');
    
  };

  module.mapController = mapController;
})(window);
