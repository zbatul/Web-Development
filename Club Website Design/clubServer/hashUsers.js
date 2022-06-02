const fs = require('fs');
const bcrypt = require('bcryptjs');
const users = require('./clubUsers2.json');
let nRounds = 13;
let hashedUsers = [];
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);

// Your code here to process the passwords
// Hashing a password for each user
users.forEach(function(user){
    let salt = bcrypt.genSaltSync(nRounds); // New salt everytime!
    let passHash = bcrypt.hashSync(user.password, salt);
    hashedUsers.push({"firstName": user.firstName, 
                      "lastName": user.lastName,
                      "email": user.email,
                      "passHash": passHash,
                      "role": user.role});
})

let elapsed = new Date() - start; // timing code
console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
fs.writeFileSync("clubUsersHash.json", JSON.stringify(hashedUsers, null, 2));