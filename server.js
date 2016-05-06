var requestProxy = require('express-request-proxy'),
  express = require('express'),
  http = require('https'),
  Firebase = require('firebase'),
  port = process.env.PORT || 3000,
  app = express();

fireDataBase = new Firebase('https://intense-heat-7080.firebaseio.com');

app.use(express.static('./'));

app.get('/admin/update-latlng-database', function (request, response) {
  console.log('New request:', request.url);
  updateLatLngInDataBase();

});
app.get('/admin/update-firedb-with-socrata', function (request, response) {
  console.log('New request:', request.url);
  checkFireDBforData();
});

app.get('*', function (request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {
    root: '.'
  });
});

app.listen(port, function () {
  console.log('Server started on port ' + port + '!');
});

var getSocrata = function () {
  var url = 'https://data.wa.gov/resource/rfq4-2k5i.json?' + '$limit=3000&' + '$$app_token=' + process.env.WA_DATA_TOKEN;
  http.get(url, function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      var socrataResponse = JSON.parse(body);
      socrataResponse.map(function (school) {
        fireDataBase.child('schools').push(school);
      });
    }).on('error', function (e) {
      console.log('Got an error: ');
    });
  });
};

var checkFireDBforData = function () {
  fireDataBase.child('schools').once('value', function (snapshot) {
    if (snapshot.exists() === false) {
      getSocrata();
    }
  });
};

var updateLatLngInDataBase = function () {
  fireDataBase.child('schools').once('value', function (snapshot) {
    counter = 0;
    stop = 80;
    snapshot.forEach(function (childSnapshot) {
      var key = childSnapshot.key();
      var childData = childSnapshot.val();
      if (childData.hasOwnProperty('lat') === false) {
        counter = counter + 1;
        if (counter < stop) {
          console.log('Calling Google api for lat lng of: ' + childData.address + childData.city);
          getLocationFromAddressandSaveToDB(childData.address, childData.city, 'WA', key);
        }
      } else {
      };
    });
  });
};

var getLocationFromAddressandSaveToDB = function (address, city, state, key) {
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?' +
    'address=' + address.replace(/ /g, '+') +
    ',' + city.replace(/ /g, '+') +
    ',' + state +
    '&key=' + process.env.GOOGLE_MAP_KEY;
  http.get(url, function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      var googleApiData = JSON.parse(body);
      console.log('LOG :', googleApiData.status);
      if (googleApiData.status === 'OK') {
        fireDataBase.child('schools').child(key).update({
          lat: googleApiData.results[0].geometry.location.lat,
          lng: googleApiData.results[0].geometry.location.lng
        });

        console.log('Finished call:' + googleApiData.results[0].geometry.location.lat + googleApiData.results[0].geometry.location.lng);
      }
    }).on('error', function (e) {
      console.log('Got an error: ');
    });
  });
};
