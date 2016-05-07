(function (module) {

  function School(opts) {

    this.latLng = {lat: opts['lat'], lng: opts['lng']}
    Object.keys(opts).forEach(function (e, index, keys) {
      this[e] = opts[e];
    }, this);

  }

  School.all = [];

  School.fetchAll = function () {
    if (localStorage.getItem('schools') != null) {
      s = JSON.parse(localStorage.getItem('schools'))
      School.loadAll(s);
    } else {
      var ref = new Firebase('https://intense-heat-7080.firebaseio.com/');
      ref.child('schools').once('value', function (snapshot) {
        schools = snapshot.val();
        localStorage.setItem('schools', JSON.stringify(schools));
        console.log("Loading Schools from local snapshot");
        School.loadAll(schools);
      });
    }
  };

  School.loadAll = function (firedata) {
     keys = Object.keys(firedata);
    School.all = keys.map(function (k) {
      return new School(firedata[k]);
    });
  };

  module.School = School;
})(window);
