const assert = require('chai').assert;
const fetch = require('node-fetch');
const getCookies = require('./getCookies');
const urlBase = require('../testURL');


describe('Activity Testing', function(){
    var evnt = {
        "activity": "All Hands Meet",
        "timings": "10:00PM - 12:00PM, Sun",
        "items": ["Yarn", "Scissors", "Tapestry Needle", "Knitting Needles"],
        "desc": "Meet and learn from knitters all around!"
    };
    var long_evnt = {
        "activity": "Longgg eventtttt Longgg eventtttt Longgg eventtttt Longgg eventtttt",
        "timings": "10:00PM - 12:00PM, Sun",
        "items": ["Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles", "Yarn", "Scissors", "Tapestry Needle", "Knitting Needles"],
        "desc": "Meet and learn from knitters all around!"
    };
    var bad_evnt = {
        "activity": "Get together",
        "items": ["Yarn", "Scissors", "Tapestry Needle", "Knitting Needles"],
        "desc": "Gathering of all members and guests!"
    }
    describe('Get Activity Tests', function () {
        let res;
        let events = null;
        before(async function(){
            res = await fetch(urlBase + 'activities');
        })
        it('Everything is OK', async function(){
            assert.equal(res.status, 200);
        });
        it('Returns an array', async function(){
            events = await res.json();
            assert.isArray(events);
        });
        it('All activities have activity and timings', function(){
            events.forEach(function(eve){
                assert.containsAllKeys(eve, ['activity', 'timings']);
            });
        });
    });
    describe('Add Activity Tests', function () {
        it('Try Add activity w/o logging in', async function(){
            res = await fetch(urlBase + 'activities', {
                method: "post",
                body: JSON.stringify(evnt),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            assert.notEqual(res.status, 201);
        });
        describe('Login and Add activity', function(){
            before(async  function(){
                res = await fetch(urlBase + 'login', {
                    method: "post",
                    body: JSON.stringify({
                        "email": "biune1929@gmail.com",
                        "password": "OJ;eGI;l"
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                myCookie = getCookies(res);
            });
            it('Add good activity', async function(){
                res = await fetch(urlBase + 'activities', {
                    method: "post",
                    body: JSON.stringify(evnt),
                    headers: {
                        "Content-Type": "application/json",
                        "cookie": myCookie
                    },
                });
                assert.equal(res.status, 201);
            });
            it('Add Too Big activity', async function(){
                res = await fetch(urlBase + 'activities', {
                    method: "post",
                    body: JSON.stringify(long_evnt),
                    headers: {
                        "Content-Type": "application/json",
                        "cookie": myCookie
                    },
                });
                assert.equal(res.status, 500);
            });
            it('Add Missing stuff activity', async function(){
                res = await fetch(urlBase + 'activities', {
                    method: "post",
                    body: JSON.stringify(bad_evnt),
                    headers: {
                        "Content-Type": "application/json",
                        "cookie": myCookie
                    },
                });
                assert.notEqual(res.status, 201);
            });
        });
    });
    describe('Delete Activity Tests', function () {
        it('Try Delete w/o logging in', async function(){
            res = await fetch(urlBase + 'activities/fAkdix8r5lnbMxbC', {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            assert.notEqual(res.status, 200);
        });
        it('Login then delete', async function(){
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "biune1929@gmail.com",
                    "password": "OJ;eGI;l"
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            myCookie = getCookies(res);
            res = await fetch(urlBase + 'activities/fAkdix8r5lnbMxbC', {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "cookie": myCookie
                },
            });
            assert.equal(res.status, 200);
        });
        it('Login then Bad delete (invalid id)', async function(){
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "biune1929@gmail.com",
                    "password": "OJ;eGI;l"
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            myCookie = getCookies(res);
            res = await fetch(urlBase + 'activities/uLBSRCnimD6T', {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "cookie": myCookie
                },
            });
            assert.notEqual(res.status, 200);
        });
    });
})
