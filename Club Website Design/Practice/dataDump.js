// synchronously read dataDump.js file and output the contents
const fs = require('fs'); // File system module
let fname = __dirname + '/eventData.json';
let fdata = fs.readFileSync(fname, 'utf8')
let jsonData = JSON.parse(fdata);
jsonData["events"].map(function (data, i) {
    console.log(`Event ${i+1}: ${data["activity"]}`);
    console.log(`\tTimings: ${data["timings"]}`);
    console.log(`\tItems to bring with you: ${data["items"]}`);
    console.log(`\tEvent desciption: ${data["desc"]}\n`);
});
