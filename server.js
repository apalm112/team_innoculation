var requestProxy = require('express-request-proxy'),
  express = require('express'),
  http = require('https'),
  port = process.env.PORT || 3000,
  app = express();

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});

var url = 'https://data.wa.gov/resource/rfq4-2k5i.json?' + '$limit=3000&' + '$$app_token=' + process.env.WA_DATA_TOKEN;

console.log(url);

http.get(url, function(res) {
  var body = '';

  res.on('data', function (chunk) {
    body += chunk;
  });

  res.on('end', function() {
    var socrataResponse = JSON.parse(body);
    console.log(socrataResponse.length);
  });
}).on('error', function(e) {
  console.log('Got an error: ');
});
