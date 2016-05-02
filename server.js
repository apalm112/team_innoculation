var requestProxy = require('express-request-proxy'),
  express = require('express'),
  http = require('https'),
  Firebase = require('firebase'),
  port = process.env.PORT || 3000,
  app = express();

fireDataBase = new Firebase('https://intense-heat-7080.firebaseio.com');
fireDataBase.remove();

//changed limit to 3 for testing of google maps api call
var url = 'https://data.wa.gov/resource/rfq4-2k5i.json?' + '$limit=3&' + '$$app_token=' + process.env.WA_DATA_TOKEN;

app.use(express.static('./'));

app.get('/updatelatlonindatabase', function (request, response) {
  console.log('New request:', request.url);
  updateLatLonInDataBase();
  // response.send(fireDataBase.once('value', function (data) {
  // //  do some stuff once
  // }));
});

var updateLatLonInDataBase = function () {
  console.log('do stuff here like update database');
  fireDataBase.once('value', function (snapshot) {
    // The callback function will get called twice, once for "fred" and once for "barney"
    snapshot.forEach(function (childSnapshot) {
      // key will be "fred" the first time and "barney" the second time
      var key = childSnapshot.key();
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
      console.log(childData);
      getLocationFromAddressandSaveToDB(childData.address, childData.city, 'WA', key);
      //call google and get address
      //then save back to firedb
    });
  });
};

app.get('*', function (request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {
    root: '.'
  });
});

app.listen(port, function () {
  console.log('Server started on port ' + port + '!');
});

//Reference: https://developers.google.com/maps/documentation/geocoding/intro#geocoding
//Example Call: https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

var getLocationFromAddressandSaveToDB = function (address, city, state, key) {
  url = 'https://maps.googleapis.com/maps/api/geocode/json?' +
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
    //  callback to update database (new lat lon)
      console.log(googleApiData.results[0].geometry.location);
      console.log(key);
      fireDataBase.child(key).update({lat:googleApiData.results[0].geometry.location.lat, lng: googleApiData.results[0].geometry.location.lng});
    }).on('error', function (e) {
      console.log('Got an error: ');
    });
  });
};

/// new function
// get firebase entries and /map over
//make call to googleapi for each entry
//update firebase entry

http.get(url, function (res) {
  var body = '';
  res.on('data', function (chunk) {
    body += chunk;
  });
  res.on('end', function () {
    var socrataResponse = JSON.parse(body);
    socrataResponse.map(function (school) {
      fireDataBase.push(school);
    });
  }).on('error', function (e) {
    console.log('Got an error: ');
  });
});
