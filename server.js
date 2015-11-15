var path = require('path');
var express = require('express');

var app = express();

app.use('/static', express.static('dist'));
app.use(express.static('static'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + process.env.PORT);
});
