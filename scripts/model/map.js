(function(module){

  var Map = {};
  var infowindow = null;
  var pos;
  var userCords;

  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(47.1878462, -125.3379204),
    panControl: true,
    panControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT
    },
    zoomControl: true,
    zoomCOntrolOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scaleControl: false
  };
  var map;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      var LatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      mapOptions;
      map = new google.maps.Map($('#map-canvas'), mapOptions);
      var marker = new google.maps.Marker({
        position: LatLng,
        map: map,
        title: '<div style="height:60px;width:200px"><b>Latitude: ' + pos.coords.latitude + 'Longitude: ' + pos.coords.longitude
      });
      google.maps.event.addListener(marker, 'mouseover', function(e){
        e.preventDefault();
        var infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent(marker.title);
        infoWIndow.open(map,marker);
      });
    });
  } else {
    alert('Geo Location feature is not supported in this browser.');

    var infowindow = new google.maps.InfoWindow({
      content: 'placeholder'
    });
  }

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(47.1878462, -125.3379204)
  });

  google.maps.event.addListener(marker, 'mousover', function(){
    infowindow.open(map, marker);
  });

  google.maps.event.addListener(marker, 'mouseout', function(){
    infowindow.close(map, marker);
  });

  marker.setMap(map);

  $('#textAddress').submit(function(e){
    e.preventDefault();
    var $userAddress = $('#textAddress').val();
    var accessUrl;

    if($userAddress){
      accessUrl = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAP_KEY;
    } else{
      accessUrl = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAP_KEY + '/locSearch?=lat' + userCords.latitude + '&lng=' + userCords.longitude;
    }

    $.ajax({
      type: 'GET',
      url: accessUrl,
      dataType: 'json',
      success: function(data){
        $.each(data.results, function( i, val){
          schoolAddress.push(val.address);
          schoolCity.push(val.city);
          schoolName.push(val.schoolname);
          console.log(data);
        });
      }
    });
  });
  module.Map = Map;
}) (window);
