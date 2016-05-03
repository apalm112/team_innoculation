  (function(module) {

    var indexView = {};

    var placeSearch, autocomplete;

    indexView.initAutocomplete = function() {
          // Create the autocomplete object, restricting the search to geographical
          // location types.
      autocomplete = new google.maps.places.Autocomplete(
              /** @type {!HTMLInputElement} */
              (document.getElementById('autocomplete')), {
                types: ['geocode']
              });
    };
          // When the user selects an address from the dropdown, populate the address
          // fields in the form.
          // autocomplete.addListener('place_changed', fillInAddress);    }

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
    indexView.geolocate = function() {
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
      }
    };

    $('button').on('click', function() {
      console.log(autocomplete.getPlace());
      lat = autocomplete.getPlace().geometry.location.lat();
      lng = autocomplete.getPlace().geometry.location.lng();

          //  var myLatlng = new google.maps.LatLng(lat,lng);

          //  var marker = new google.maps.Marker({
          //    position: myLatlng,
          //    title: 'Hello World!'
          //  });

          // To add the marker to the map, call setMap();
          //  marker.setMap(map);

      page('/map/lat/' + lat + '/lng/' + lng);
    });

    module.indexView = indexView;
  })(window);
