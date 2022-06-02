const fetch = require('node-fetch');

var evnt = {
        "activity": "All Hands Meet",
        "timings": "10:00PM - 12:00PM, Sun",
        "items": ["Yarn", "Scissors", "Tapestry Needle", "Knitting Needles"],
        "desc": "Meet and learn from knitters all around!"
    };

var url = 'http://127.0.0.1:3047';
fetch(url + '/activities', {
        method: 'post',
        body: JSON.stringify(evnt),
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(json => console.log(json));