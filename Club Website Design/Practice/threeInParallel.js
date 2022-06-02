//  Demonstration of promises for HTTP requests running in parallel on Node.js.

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
let p1 = fetch(myRes1.url, myRes1.options).then(res => {
  let time = (new Date() - start) / 1000;
  return console.log(`MDN website status: ${res.statusText}, time: ${time}`);
});

let p2 = fetch(myRes2.url, myRes2.options).then(res => {
  let time = (new Date() - start) / 1000;
  return console.log(`Railway India website status: ${res.statusText}, time: ${time}`);
});

let p3 = fetch(myRes3.url, myRes3.options).then(res => {
  let time = (new Date() - start) / 1000;
  return console.log(`Homeaffairs Australia website status: ${res.statusText}, time: ${time}`);
});

console.log("Starting my web requests:");
Promise.all([p1, p2, p3]).then(x => {
  let time = (new Date() - start) / 1000;
  console.log(`All Finished, total time: ${time}`);
});
