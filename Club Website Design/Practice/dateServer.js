var express = require('express');
var app = express();

port = 3333; // Or anything you'd like
host = '127.21.12.3'; // Any loopback address

var dt = new Date(); // date object

app.get('/date', function (req, res) {
    res.send(`<p>Batul Zamin</p><p>Date and Time: ${dt.toLocaleString()}<p>`);
});

app.listen(port, host, function () {
  console.log(`Date and Time app listening on IPv4: ${host}:${port}`);
});
