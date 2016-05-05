(function(module) {

  var mapView = {};

  var placeSearch, autocomplete;

  mapView.initAutocomplete = function(ctx, next) {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
    autocompletemap = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */
            (document.getElementById('autocomplete-map')), {
              types: ['geocode']
            });
    next();
  };
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        // autocomplete.addListener('place_changed', fillInAddress);    }

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
  mapView.geolocate = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    };

    $('#submit-map').on('click', function() {
      lat = autocompletemap.getPlace().geometry.location.lat();
      lng = autocompletemap.getPlace().geometry.location.lng();
      google.maps.event.trigger(map, 'resize');
      latLng = {
        lat:lat,
        lng: lng
      }
      console.log(latLng);
      map.setCenter(latLng);
      map.setZoom(16);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Your search address',
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });
      marker.setMap(map);
      history.pushState('', '', '/map/lat/' + lat + '/lng/' + lng);
    });
  };

  $('#autocomplete-map').keypress(function(e){
    if (e.which === 13) {
      lat = autocompletemap.getPlace().geometry.location.lat();
      lng = autocompletemap.getPlace().geometry.location.lng();
      window.location = '/map/lat/' + lat + '/lng/' + lng;
    }
  });

  module.mapView = mapView;
})(window);
