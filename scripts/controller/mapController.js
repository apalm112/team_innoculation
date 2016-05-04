(function (module) {
  var mapController = {};

  mapController.index = function (ctx, next) {

    var schoolId, allLatLng, allMarkers, schoolName = [];

    var latLng = {
      lat: parseFloat(ctx.params.lat),
      lng: parseFloat(ctx.params.lng)
    };

    initMap(latLng);
    //need to add schools as a parameter
    $('#home-container').hide();
    $('#map-elements').show();
    next();
  };

  mapController.findSchools = function (ctx, next) {

    var ref = new Firebase('https://intense-heat-7080.firebaseio.com/');

     //setting limit for testing
    ref.child('schools').limitToFirst(20).once('value', function (snapshot) {
      ctx.schools = snapshot.val();
      next();
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
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
        percentPersonalExemption: ctx.schools[k].percent_with_personal_exemption,
        percentReligiousExemption: ctx.schools[k].percent_with_religious_exemption,
        percentMedicalExemption: ctx.schools[k].percent_with_medical_exemption,
        percentTotalExemption: ctx.schools[k].percent_with_any_exemption,
        percentCompletedImmunization: ctx.schools[k].percent_complete_for_all_immunizations,
        totalEnrollment: ctx.schools[k].k_12_enrollment
      });
    });

    schoolArray.map(function (school) {
      var marker = new google.maps.Marker({
        position: school.latLng,
        content: '<h1>' + school.school + '</h1><p>Percent Personal Exemption: ' + school.percentPersonalExemption + '</p><p>Percent Religious Exemption: ' + school.percentReligiousExemption + '</p><p>Percent Medical Exemption: ' + school.percentMedicalExemption + '</p><p>Percent Total Exemption: ' + school.percentTotalExemption + '</p><p>Percent Completed Immunization: ' + school.percentCompletedImmunization + '</p><p>Total Enrollment: ' + school.totalEnrollment + '</p>'
      });
      // var contentString = '<h1>' + schoolArray + '</h1>';
      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });

      var infoWindow = new google.maps.InfoWindow();
        // content: contentString
      infoWindow.setContent(marker.content);
      // To add the marker to the map, call setMap();
      marker.setMap(map);
    });
  };

  module.mapController = mapController;
})(window);
