(function(module) {

  var mapView = {};

  var placeSearch, autocomplete;

  mapView.initAutocomplete = function(ctx, next) {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
    autocomplete = new google.maps.places.Autocomplete(
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

    $('button-map').on('click', function() {
    //  console.log(autocomplete.getPlace());
      lat = autocomplete.getPlace().geometry.location.lat();
      lng = autocomplete.getPlace().geometry.location.lng();

      window.location = '/map/lat/' + lat + '/lng/' + lng;
      $('.loading').show();
      // page('/map/lat/' + lat + '/lng/' + lng);
    });
  };

  $('#autocomplete-map').keypress(function(e){
    if (e.which === 13) {
      lat = autocomplete.getPlace().geometry.location.lat();
      lng = autocomplete.getPlace().geometry.location.lng();
      window.location = '/map/lat/' + lat + '/lng/' + lng;
    }
  });

  module.mapView = mapView;
})(window);
