function initMap(latLng, zoom) {
  if (navigator.geolocation) {
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

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: latLng,
    zoom: zoom,
    panControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT
    },
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    disableDoubleClickZoom: false
  });

  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: 'Your address',
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });
};

function hideMap() {
  $('#map-container').hide();
};
