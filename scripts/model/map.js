function initMap() {

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {
      lat: 47.4235,
      lng: -120.3103
    },
    zoom: 6,
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

function hideMap() {
  $('#map-container').hide();
};
