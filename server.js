var requestProxy = require('express-request-proxy'),
  express = require('express'),
  http = require('https'),
  Firebase = require('firebase'),
  port = process.env.PORT || 3000,
  app = express();

fireDataBase = new Firebase('https://intense-heat-7080.firebaseio.com');
fireDataBase.remove();
var url = 'https://data.wa.gov/resource/rfq4-2k5i.json?' + '$limit=3000&' + '$$app_token=' + process.env.WA_DATA_TOKEN;

app.use(express.static('./'));

app.get('*', function (request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {
    root: '.'
  });
});

app.listen(port, function () {
  console.log('Server started on port ' + port + '!');
});

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
