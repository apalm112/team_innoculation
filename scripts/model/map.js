function initMap (latLng) {

  if(navigator.geolocation) {
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    function success(pos) {
      userCords = pos.coords;
    }

    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert('Geolocation is not supported in your browser');
  }

  if (!latLng) {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: 47.3232,
      lng: -120.3232},
      zoom: 7,
      panControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_LEFT
      },
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      disableDoubleClickZoom: false
    });

  } else {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center:latLng,
      zoom: 15,
      panControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_LEFT
      },
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      disableDoubleClickZoom: false
    });
  };
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: 'Your address',
  });
};

function hideMap() {
  $('#map-container').hide();
};
