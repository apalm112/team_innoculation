(function (module) {
  var mapController = {};

  mapController.index = function (ctx, next) {

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

  mapController.findSchools = function (ctx, next) {

    var ref = new Firebase('https://intense-heat-7080.firebaseio.com/');

    ref.once('value', function (snapshot) {
      ctx.schools = snapshot.val();
      next();
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
  };

  mapController.renderSchools = function (ctx, next) {

    keys = Object.keys(ctx.schools.schools);
    schoolArray = [];
    keys.map(function (k) {
      schoolArray.push({
        key: k,
        latLng: {
          lat: ctx.schools.schools[k].lat,
          lng: ctx.schools.schools[k].lng
        }
      });
    });

    schoolArray.map(function (school) {
      var marker = new google.maps.Marker({

        position: school.latLng,
        title: school.key
      });

      // To add the marker to the map, call setMap();
      marker.setMap(map);
    });
  };

  module.mapController = mapController;
})(window);
