var express = require('express');
const bcrypt = require('bcryptjs');
var app = express();
const session = require('express-session');
var Ajv = require('ajv');
var ajv = new Ajv();
    
port = 3047; // Port number 3000 + N = 3000 + 47 = 3047

const Datastore = require('nedb-promises');
let events = Datastore.create('./events.db');
let members = Datastore.create('./members.db');
const activitySchema = require('./activitySchema.json');
const memberSchema = require('./memberSchema.json');
const applicantSchema = require('./applicantSchema.json');

const cookieName = "nd9354id";

// Session use
app.use(session({
    secret: 'Celebrity coming at Knitting Session Today!',
    resave: false,
    saveUninitialized: false,
    name: cookieName // Sets the name of the cookie used by the session middleware
}));

// This initializes session state
const setUpSessionMiddleware = function (req, res, next) {
    console.log(`session object: ${JSON.stringify(req.session)}`);
    console.log(`session id: ${req.session.id}`);
    if (!req.session.user) {
        req.session.user = {role: "guest"};
    };
    next();
};

app.use(setUpSessionMiddleware);
app.use(express.static('public')); // for static assets

// Use this middleware to restrict paths to only logged in users
const memberOnly = function (req, res, next) {
    if (req.session.user.role === "guest") {
        res.status(401).json({error: "Not permitted"});
    } 
    else {
        console.log(`Session info: ${JSON.stringify(req.session)} \n`);
        next();
    }
};

// User this middlewave to restrict paths only to admins
const adminOnly = function (req, res, next) {
    if (req.session.user.role !== "admin") {
        res.status(401).json({error: "Not permitted"});
    } 
    else {
        next();
    }
};

// User this to log json errors
const jsonErrors = function (err, req, res, next) {
    // prepare and send error response here, i.e.,
    // set an error code and send JSON message
    console.log('JSON input over limit');
    res.status(500).send(JSON.stringify(err));
}

// Get club info
app.get('/info', function (req, res) {
    var jsonObj = {"clubName": "Fremont Knitting CLub",
         "ownerName": "Batul Zamin",
         "ownerNetId": "nd9354"};
    res.json(jsonObj);
});

// Get all activities
app.get('/activities', async function (req, res) {
    let evs = await events.find({});
    res.json(evs);
});

// Add activity
app.post('/activities', memberOnly, express.json({limit: '2KB'}), async function(req, res) {
    console.log(`path /activities received: ${JSON.stringify(req.body)}`);
    var valid = ajv.validate(activitySchema, req.body);
    if (!valid) {
        console.log(ajv.errors);
        res.status(400).json({error: true, message: "Bad Activity Schema"});
        return;
    }
    let event = await events.insert(req.body);
    let evs = await events.find({});
    res.status(201).json(evs);
}, jsonErrors);

// Delete activity
app.delete('/activities/:id', memberOnly, async function(req, res) {
    const activityId = req.params.id;
    const itemToDelete = await events.remove({_id: activityId});
    console.log(`Delete activity id: ${activityId}`);
    if(itemToDelete == 0) {
        console.log('There is no event with such id');
        res.status(400).json({error: true, message: "Bad Index"});
        return;
    }
    let evs = await events.find({});
    res.status(200).json(evs);
});

// Get all members
app.get('/members', adminOnly, async function (req, res) {
    let mems = await members.find({});
    res.json(mems);
});

// Add member
app.post('/members', adminOnly, express.json({limit: '2KB'}), async function(req, res) {
    console.log(`path /members received: ${JSON.stringify(req.body)}`);
    var valid = ajv.validate(memberSchema, req.body);
    if (!valid) {
        console.log(ajv.errors);
        res.status(400).json({error: true, message: "Bad Member Schema"});
        return;
    }
    let mem = await members.insert(req.body);
    let mems = await members.find({});
    res.status(201).json(mems);
}, jsonErrors);

// Delete member
app.delete('/members/:id', adminOnly, async function(req, res) {
    const memberId = req.params.id;
    const itemToDelete = await members.remove({_id: memberId});
    console.log(`Delete member id: ${memberId}`);
    if(itemToDelete == 0) {
        console.log('There is no member with such id');
        res.status(400).json({error: true, message: "Bad Index"});
        return;
    }
    let mems = await members.find({});
    res.status(200).json(mems);
});

// Add applicant
app.post('/applicants', express.json({limit: '2KB'}), async function(req, res) {
    console.log(`path /applicants received: ${JSON.stringify(req.body)}`);
    var valid = ajv.validate(applicantSchema, req.body);
    if (!valid) {
        console.log(ajv.errors);
        res.status(400).json({error: true, message: "Bad Applicant Schema"});
    }
    else {
        res.status(201).json(JSON.stringify(req.body));
    }
}, jsonErrors);

// login Post
app.post('/login', express.json(), async function(req, res) {
    let verified = false;
    let mem = null;
    console.log(`path /login received: ${JSON.stringify(req.body)}`);
    let member = await members.findOne({email: req.body.email})
        .then(docs => {
            if(docs != null){
                verified = bcrypt.compareSync(req.body.password, docs.passHash);    
                mem = docs;
            }
        })
        .catch(err => {
            console.log("Something went wrong!");
            console.log(err);
        });
    if(verified){
        // Upgrade in priveledge, should generate new session id
        // Save old session information if any, create a new session
		let oldInfo = req.session.user;
		req.session.regenerate(function (err) {
			if (err) {
				console.log(err);
			}
			let newUserInfo = Object.assign(oldInfo, mem);
			delete newUserInfo.passHash;
			req.session.user = newUserInfo;
			res.status(200).json(newUserInfo);
		});
    }
    else{
        res.status(401).json({"error": true, "message": "User/Password error" });
    }
});

// Get path for logout
app.get('/logout', async function (req, res) {
    let options = req.session.cookie;
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
		}
		res.clearCookie(cookieName, options); // the cookie name and options
		res.json({message: "Goodbye"});
	})
});


app.listen(port, function () {
  console.log(`clubServer app listening on port: ${port}`);
});

module.exports = app;