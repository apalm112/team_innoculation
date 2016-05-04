
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

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center:latLng,
    //   lat: lat,
    //   lng: lng

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

    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: 'Hello World!'
    });
  };

  function hideMap() {
    $('#map-container').hide();
  };
