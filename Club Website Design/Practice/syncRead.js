// synchronously read login.html file and count number of lines in it
const fs = require('fs'); // File system module
let fname = __dirname + '/login.html';
let fdata = fs.readFileSync(fname, 'utf8').toString();
let flines = fdata.split('\n');
let flength = flines.length - 1;
console.log(`The number of lines in the login.html file is: ${flength}.`);