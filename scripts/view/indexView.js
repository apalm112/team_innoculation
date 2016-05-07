(function(module) {

  var indexView = {};

  var placeSearch, autocomplete;

  indexView.initAutocomplete = function(ctx, next) {
    autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */
            (document.getElementById('autocomplete')), {
              types: ['geocode']
            });
    next();
  };
  indexView.geolocate = function(ctx, next) {
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
      next();
    };

    $('#submit-index').on('click', function() {
      lat = autocomplete.getPlace().geometry.location.lat();
      lng = autocomplete.getPlace().geometry.location.lng();

      window.location = '/map/lat/' + lat + '/lng/' + lng;
      $('.loading').show();
    });
  };

  $('#autocomplete').keypress(function(e){
    if (e.which === 13) {

      // brian signs off on this - no point deducted
      setTimeout(function() {
        $('#submit-index').click();
      }, 500);
    }
  });

  module.indexView = indexView;
})(window);
