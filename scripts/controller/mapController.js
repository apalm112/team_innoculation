(function (module) {
  var mapController = {};

  mapController.index = function (ctx, next) {

    if (!ctx.params.lat) {
      var latLng = {
        lat: 47.3232,
        lng: -120.3232
      };
      var zoom = 6;
    } else {

      var latLng = {
        lat: parseFloat(ctx.params.lat),
        lng: parseFloat(ctx.params.lng)
      };
      var zoom = 15;
    }

    ctx.latLng = latLng;
    ctx.zoom = zoom;

    $('.loading').show();
    $('#about-container').hide();
    initMap(latLng, zoom);
    next();
  };

  mapController.findSchools = function (ctx, next) {
    School.fetchAll();
    next();
  };

  mapController.renderSchools = function (ctx, next) {
    $('#home-container').hide();
    $('#map-container').show();
    $('.loading').hide();

    var filteredSchoolArray = School.all.filter(function (k) {
      return (-123 < k.latLng.lng) && (-117 > k.latLng.lng) && (45 < k.latLng.lat) && (49 > k.latLng.lat);
    });

    filteredSchoolArray.map(function (school) {
      var marker = new google.maps.Marker({
        map: map,
        position: school.latLng,
        key: school.key,
        // content: '<h1>' + school.school_name + '</h1><p>Personal Exemption: ' + Math.ceil(school.percent_with_personal_exemption * 100)+ '%</p><p>Religious Exemption: ' +   Math.ceil(school.percent_with_religious_exemption * 100) + '%</p><p>Medical Exemption: ' + Math.ceil(school.percent_with_medical_exemption * 100) + '%</p><p>Total Exemption: ' + Math.ceil(school.percent_with_any_exemption * 100) + '%</p><p>Completed Immunization:' + Math.ceil(school.percent_complete_for_all_immunizations * 100) + '%</p><p>Total Enrollment: ' + school.k_12_enrollment+ '</p>',
        name1: school.school_name,

      });

      marker.addListener('click', function () {
        School.getShoolData(marker.key, mapController.renderSchoolChart)
        $('#chart-wrapper').fadeIn('slow');

        $('footer').hide();
      });

      mapController.renderSchoolChart = function (school) {
        data = [Math.ceil(school.percent_with_personal_exemption * 100),
          Math.ceil(school.percent_with_religious_exemption * 100),
          Math.ceil(school.percent_with_medical_exemption * 100),
          Math.ceil(school.percent_complete_for_all_immunizations * 100)]
        content =  '<h1>' + school.school_name + '</h1><p>Personal Exemption: ' + Math.ceil(school.percent_with_personal_exemption * 100)+ '%</p><p>Religious Exemption: ' +   Math.ceil(school.percent_with_religious_exemption * 100) + '%</p><p>Medical Exemption: ' + Math.ceil(school.percent_with_medical_exemption * 100) + '%</p><p>Total Exemption: ' + Math.ceil(school.percent_with_any_exemption * 100) + '%</p><p>Completed Immunization:' + Math.ceil(school.percent_complete_for_all_immunizations * 100) + '%</p><p>Total Enrollment: ' + school.k_12_enrollment+ '</p>',
        displayChart(school.school_name, data);
        $('#school-data h1').text(school.school_name);
        $('#school-data').html(content);
      }

      marker.addListener('mouseover', function () {
        infoWindow.open(map, marker);
      });

      marker.addListener('mouseout', function () {
        infoWindow.close(map, marker);
      });

      var infoWindow = new google.maps.InfoWindow();
      infoWindow.setContent(marker.name1);

      var someArray = marker.content;
      // To add the marker to the map, call setMap();
      marker.setMap(map);
      google.maps.event.trigger(map, 'resize');
      map.setCenter(ctx.latLng);
      map.setZoom(ctx.zoom);
    });
    next();
  };

  module.mapController = mapController;
})(window);
