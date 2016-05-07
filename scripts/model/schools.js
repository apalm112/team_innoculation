(function (module) {

  function School(opts) {
    this.latLng = {
      lat: opts['lat'],
      lng: opts['lng']
    }
    Object.keys(opts).forEach(function (e, index, keys) {
      this[e] = opts[e];
    }, this);
  }

  School.all = [];

  School.getShoolData = function (key, callback) {
    var ref = new Firebase('https://intense-heat-7080.firebaseio.com/');
    ref.child('schools').child(key).once('value', function (snapshot) {
      callback(snapshot.val());
    });
  };

  School.fetchAll = function (ctx, next) {
    if (localStorage.getItem('schools') != null) {
      s = JSON.parse(localStorage.getItem('schools'));
      School.loadAll(s);
    } else {
      var ref = new Firebase('https://intense-heat-7080.firebaseio.com/');
      ref.child('schools').once('value', function (snapshot) {
        schools = snapshot.val();
        keys = Object.keys(schools);
        trimmedSchools = [];

        keys.map(function (k) {
          trimmedSchools.push({
            key: k,
            school_name: schools[k].school_name,
            latLng: {
              lat: schools[k].lat,
              lng: schools[k].lng
            }
          });
          if (next) {
            next();
          }
        });
        localStorage.setItem('schools', JSON.stringify(trimmedSchools));
        School.loadAll(trimmedSchools);
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
