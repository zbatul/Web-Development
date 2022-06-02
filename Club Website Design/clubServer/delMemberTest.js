const fetch = require('node-fetch');

var url = 'http://127.0.0.1:3047';
    
fetch(url + '/members/ueHnuzYoQJB7x45N', {
        method: 'delete',
    })
    .then(res => res.json())
    .then(json => {
        console.log('Total Members after delete:');
        console.log(json.length)
    });