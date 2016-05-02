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

http.get('https://data.wa.gov/resource/rfq4-2k5i.json', function(res) {
  var body = '';

  res.on('data', function (chunk) {
    body += chunk;
  });

  res.on('end', function() {
    var socrataResponse = JSON.parse(body);
    console.log(socrataResponse);
  });
}).on('error', function(e) {
  console.log('Got an error: ');
});
