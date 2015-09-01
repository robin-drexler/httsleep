var express = require('express');
var app = express();

app.get('/:seconds', function (req, res) {
  var seconds = parseFloat(req.params.seconds);

  if (isNaN(seconds)) {
    res.status(400)
    .send('<strong>' + req.params.seconds + '</strong>' + 'are no valid seconds. Try something like <strong>3</strong>');
    return;
  }

  setTimeout(function() {
    res.send('OK!');
  }, seconds * 1000);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
