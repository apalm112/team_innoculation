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
    $('.loading').show();
    var ref = new Firebase('https://intense-heat-7080.firebaseio.com/');
    ref.child('schools').limitToLast(40).once('value', function (snapshot) {
      ctx.schools = snapshot.val();
      next();
    });
  };

  mapController.renderSchools = function (ctx, next) {
    keys = Object.keys(ctx.schools);
    schoolArray = [];
    keys.map(function (k) {
      schoolArray.push({
        key: k,
        latLng: {
          lat: ctx.schools[k].lat,
          lng: ctx.schools[k].lng
        },
        school: ctx.schools[k].school_name,
        percentPersonalExemption: Math.ceil(ctx.schools[k].percent_with_personal_exemption * 100),
        percentReligiousExemption: Math.ceil(ctx.schools[k].percent_with_religious_exemption * 100),
        percentMedicalExemption: Math.ceil(ctx.schools[k].percent_with_medical_exemption * 100),
        percentTotalExemption: Math.ceil(ctx.schools[k].percent_with_any_exemption * 100),
        percentCompletedImmunization: Math.ceil(ctx.schools[k].percent_complete_for_all_immunizations * 100),
        totalEnrollment: ctx.schools[k].k_12_enrollment
      });
      $('#home-container').hide();
      $('#map-container').show();
      $('.loading').hide();

    });

    var filteredSchoolArray = schoolArray.filter(function (k) {
      return (-123 < k.latLng.lng) && (-117 > k.latLng.lng) && (45 < k.latLng.lat) && (49 > k.latLng.lat);
    });

    filteredSchoolArray.map(function (school) {
      var marker = new google.maps.Marker({
        position: school.latLng,
        content: '<h1>' + school.school + '</h1><p>Personal Exemption: ' + school.percentPersonalExemption + '%</p><p>Religious Exemption: ' + school.percentReligiousExemption + '%</p><p>Medical Exemption: ' + school.percentMedicalExemption + '%</p><p>Total Exemption: ' + school.percentTotalExemption + '%</p><p>Completed Immunization: ' + school.percentCompletedImmunization + '%</p><p>Total Enrollment: ' + school.totalEnrollment + '</p>',
        key: school.key,
        name1: school.school,
        data1: [school.percentPersonalExemption, school.percentReligiousExemption, school.percentMedicalExemption, school.percentCompletedImmunization]
      });

      marker.addListener('click', function () {
        displayChart(marker.name1, marker.data1);
        $('#chart-wrapper').slideToggle('slow');
        $('#school-data h1').text(marker.name1);
        $('#school-data').html(marker.content);
      });

      var infoWindow = new google.maps.InfoWindow();
      infoWindow.setContent(marker.content);

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
