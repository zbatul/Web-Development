const fetch = require('node-fetch');
const bcrypt = require('bcryptjs');

let salt = bcrypt.genSaltSync(13);
let passHash = bcrypt.hashSync("xYp;@w1P", salt);
var member = {
        "firstName": "Tony",
        "lastName": "Park",
        "email": "parkt@hotmail.com",
        "passHash": passHash,
        "role": "member"
    };
var url = 'http://127.0.0.1:3047';

fetch(url + '/members', {
        method: 'post',
        body: JSON.stringify(member),
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(json => {
        console.log('Total Members after adding:');
        console.log(json.length);
    });
          