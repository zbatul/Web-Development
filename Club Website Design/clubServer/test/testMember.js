const assert = require('chai').assert;
const fetch = require('node-fetch');
const bcrypt = require('bcryptjs');
const getCookies = require('./getCookies');
const urlBase = require('../testURL');


describe('Member Testing', function(){
    let salt = bcrypt.genSaltSync(13);
    let passHash = bcrypt.hashSync("xYp;@w1P", salt);
    let passHash2 = bcrypt.hashSync("hYt;@w1P", salt);
    let passHash4 = bcrypt.hashSync("aYp;%w1W", salt);
    
    var member = {
            "firstName": "Tony",
            "lastName": "Park",
            "email": "parkt@hotmail.com",
            "passHash": passHash,
            "role": "member"
        };
    var longMember = {
            "firstName": "Femora",
            "lastName": "Parker",
            "email": "parkerf@hotmail.com",
            "passHash": passHash2,
            "role": "member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringvmember bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringvmember bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringvmember bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringvmember bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringvmember bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv member bad string member bad string member bad stringmember bad string member bad string member bad stringv v member bad stringmember bad stringv vmember bad stringv"
        };
    var missingStuffMember = {
            "firstName": "Mathew",
            "lastName": "Lee",
            "email": "leemat@hotmail.com",
            "role": "member"
        };
    var badEmailMember = {
            "firstName": "Melanie",
            "lastName": "Park",
            "email": "parktmail.com",
            "passHash": passHash4,
            "role": "member"
        };
    describe('Get Member Tests', function () {
        let res;
        let members = null;
        it('Try to access as member', async function(){
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
            res = await fetch(urlBase + 'members', {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "cookie": myCookie
                }
            });
            assert.notEqual(res.status, 200);
        });
        it('Login as Admin', async function(){
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "tirrivees1820@outlook.com",
                    "password": "49OqspUq"
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            myCookie = getCookies(res);
            res = await fetch(urlBase + 'members', {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "cookie": myCookie
                }
            });
            assert.equal(res.status, 200);
        });
        it('Returns an array', async function(){
            members = await res.json();
            assert.isArray(members);
        });
        it('All members have email and firstName', function(){
            members.forEach(function(mem){
                assert.containsAllKeys(mem, ['email', 'firstName']);
            });
        });
    });
    describe('Add Member Tests', function () {
        it('Try Add Member w/o logging in', async function(){
            res = await fetch(urlBase + 'members', {
                method: "post",
                body: JSON.stringify(member),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            assert.notEqual(res.status, 201);
        });
        describe('Admin Login', function(){
            before(async function(){
                res = await fetch(urlBase + 'login', {
                    method: "post",
                    body: JSON.stringify({
                        "email": "tirrivees1820@outlook.com",
                        "password": "49OqspUq"
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                myCookie = getCookies(res);
            });
            it('Add Good member', async function(){
                res = await fetch(urlBase + 'members', {
                    method: "post",
                    body: JSON.stringify(member),
                    headers: {
                        "Content-Type": "application/json",
                        "cookie": myCookie
                    },
                });
                assert.equal(res.status, 201);
            });
            it('Add Too Big member', async function(){
                res = await fetch(urlBase + 'members', {
                    method: "post",
                    body: JSON.stringify(longMember),
                    headers: {
                        "Content-Type": "application/json",
                        "cookie": myCookie
                    },
                });
                assert.equal(res.status, 500);
            });
            it('Add Missing Stuff member', async function(){
                res = await fetch(urlBase + 'members', {
                    method: "post",
                    body: JSON.stringify(missingStuffMember),
                    headers: {
                        "Content-Type": "application/json",
                        "cookie": myCookie
                    },
                });
                assert.notEqual(res.status, 201);
            });
            it('Add Bad Email member', async function(){
                res = await fetch(urlBase + 'members', {
                    method: "post",
                    body: JSON.stringify(badEmailMember),
                    headers: {
                        "Content-Type": "application/json",
                        "cookie": myCookie
                    },
                });
                assert.notEqual(res.status, 201);
            });
        });
    });
    describe('Delete Member Tests', function () {
        it('Try Delete w/o logging in', async function(){
            res = await fetch(urlBase + 'members/EOIPD0pgzLiQffLh', {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            assert.notEqual(res.status, 200);
        });
        it('Admin Login then delete', async function(){
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "tirrivees1820@outlook.com",
                    "password": "49OqspUq"
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            myCookie = getCookies(res);
            res = await fetch(urlBase + 'members/EOIPD0pgzLiQffLh', {
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
                    "email": "tirrivees1820@outlook.com",
                    "password": "49OqspUq"
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            myCookie = getCookies(res);
            res = await fetch(urlBase + 'members/YnhmT4Gj2eP2', {
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
