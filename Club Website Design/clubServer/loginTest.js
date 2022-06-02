const fetch = require('node-fetch');

goodLogin = {"email": "biune1929@gmail.com", "password": "OJ;eGI;l"}
badEmail = {"email": "node883@yahoo.com", "password": "doe3N0tM@tte*"}
badPassword = {"email": "thrower1972@yahoo.com", "password": "]:_272_,"}

let status;
var url = 'http://127.0.0.1:3047';
// Good email, good password
fetch(url + '/login', {
        method: 'post',
        body: JSON.stringify(goodLogin),
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => {
        status = res.statusText;
        return res.json();
    })
    .then(json => {
        console.log("Trying good login: ");
        console.log("After good login status: ", status);
        console.log(json)
    });

// Bad email (user not found)
fetch(url + '/login', {
        method: 'post',
        body: JSON.stringify(badEmail),
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => {
        status = res.statusText;
        return res.json();
    })
    .then(json => {
        console.log("Trying bad email: ");
        console.log("After bad email status: ", status);
        console.log(json)
    });

// Good email, incorrect password
fetch(url + '/login', {
        method: 'post',
        body: JSON.stringify(badPassword),
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => {
        status = res.statusText;
        return res.json();
    })
    .then(json => {
        console.log("Trying bad password: ");
        console.log("After bad password status: ", status);
        console.log(json)
    });