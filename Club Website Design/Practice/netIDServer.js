var express = require('express');
var app = express();

port = 2121; // Any port number
host = '127.21.12.5'; // Any loopback address

var dt = new Date(); // date object
var name = 'Batul Zamin';
var netID = 'nd9354';
let numHits = 0;

app.get('/netID', function (req, res) {
    numHits++;
    res.send(`Name: ${name}, netID: ${netID}, number of visits: ${numHits}`);
});

app.listen(port, host, function () {
  console.log(`NetID app listening on IPv4: ${host}:${port}`);
});
