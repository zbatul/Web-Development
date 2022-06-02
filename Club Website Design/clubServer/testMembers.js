const fetch = require('node-fetch');

var url = 'http://127.0.0.1:3047';

fetch(url + '/members', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(json => {
        console.log('Total Members:')
        console.log(json.length)
    });
