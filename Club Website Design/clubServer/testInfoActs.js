const fetch = require('node-fetch');

var url = 'http://127.0.0.1:3047';

fetch(url + '/info', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(json => {
        console.log('Club Information:')
        console.log(json)
    });

fetch(url + '/activities', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(json => {
        console.log('Club Activities:');
        console.log(json);
    });