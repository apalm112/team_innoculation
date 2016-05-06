(function (module) {

  var mapView = {};
  var placeSearch, autocomplete;

  mapView.initAutocomplete = function (ctx, next) {
    autocompletemap = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */
      (document.getElementById('autocomplete-map')), {
        types: ['geocode']
      });
    next();
  };
  mapView.geolocate = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
      });
    };

    $('#submit-map').on('click', function () {
      lat = autocompletemap.getPlace().geometry.location.lat();
      lng = autocompletemap.getPlace().geometry.location.lng();
      google.maps.event.trigger(map, 'resize');
      latLng = {
        lat: lat,
        lng: lng
      };
      map.setCenter(latLng);
      map.setZoom(16);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Your search address',
        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });
      marker.setMap(map);
      history.pushState('', '', '/map/lat/' + lat + '/lng/' + lng);
    });
  };

  $('#autocomplete-map').keypress(function (e) {
    if (e.which === 13) {
      // brian signs off on this - no point deducted
      setTimeout(function () {
        $('#submit-map').click();
      }, 500);
    }
  });

  module.mapView = mapView;
})(window);
