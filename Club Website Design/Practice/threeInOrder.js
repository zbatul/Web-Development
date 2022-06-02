//  Demonstration of promises to put HTTP requests for Node.js in a particular order.

const fetch = require('node-fetch');
let myRes1 = {
  url: "https://developer.mozilla.org/en-US/",
  options: {method: "HEAD"}
};

let myRes2 = {
  url: "https://www.irctc.com/",
  options: {method: "HEAD"}
};

let myRes3 = {
  url: "https://www.homeaffairs.gov.au/",
  options: {method: "HEAD"}
};

let start = new Date();
fetch(myRes1.url, myRes1.options)
  .then(res => {
    let time = (new Date() - start) / 1000;
    console.log(`MDN website status: ${res.statusText}, time: ${time}`);
    return fetch(myRes2.url, myRes2.options);
  })
  .then(res => {
    let time = (new Date() - start) / 1000;
    console.log(`Railway India website status: ${res.statusText}, time: ${time}`);
    return fetch(myRes3.url, myRes3.options);
  })
  .then(res => {
    let time = (new Date() - start) / 1000;
    console.log(`Homeaffairs Australia website status: ${res.statusText}, time: ${time}`);
  });
console.log("Starting my web requests:");
