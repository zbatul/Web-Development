const Datastore = require('nedb-promises');

let events = Datastore.create('./events.db');
let members = Datastore.create('./members.db');

const activities = require('./eventData.json');
const users = require('./clubUsersHash.json');

events.insert(activities)
    .then(newDocs => {console.log("Added " + newDocs.length + " events");})
    .catch(err => {console.log("Something went wrong when writing");
              console.log(err);});

members.insert(users)
    .then(newDocs => {console.log("Added " + newDocs.length + " members");})
    .catch(err => {console.log("Something went wrong when writing");
              console.log(err);});
