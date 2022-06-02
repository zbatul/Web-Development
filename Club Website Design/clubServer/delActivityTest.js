const fetch = require('node-fetch');

var url = 'http://127.0.0.1:3047';

fetch(url + '/activities', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(json => {
        console.log('All Activities:')
        console.log(json)
    });

fetch(url + '/activities/c81aN8epmRiRpC8C', {
        method: 'delete',
    })
    .then(res => res.json())
    .then(json => {
        console.log('Activities after delete:');
        console.log(json)
    });

fetch(url + '/activities/123456789', {
        method: 'delete',
    })
    .then(res => res.text())
    .then(body => {
        console.log('Response after trying to delete invalid index:');
        console.log(body)
    });