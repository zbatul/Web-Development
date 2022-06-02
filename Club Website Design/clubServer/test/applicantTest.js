const assert = require('chai').assert;
const fetch = require('node-fetch');
const getCookies = require('./getCookies');
const urlBase = require('../testURL');


describe('Applicant Testing', function(){
    var appl1 = {
        "name": "Tony Chi",
        "email": "goodvibetony@yandex.com",
        "password": "Unc0mm*0n",
        "skillLevel": "Beginner"
    };
    var appl2 ={
        "name": "Kailey Hershaw",
        "email": "gogokailey@yandex.com",
        "password": "Unc0mm*0n",
        "skillLevel": "Beginner",
        "hearAboutUs": "Hear about you from a friend.",
        "Comments": "This is a very very very very very long very very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very v ry very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very ry very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very vvery very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very longvery very very very very long commenttttttttttttttttttttt"
    };
    var appl3 = {
        "name": "Amanda Anderson",
        "email": "goodvibetony@yandex.com",
        "skillLevel": "Beginner"
    };
    var appl4 = {
        "name": "Rahul Ravichandra",
        "email": "rahul.com",
        "password": "Unc0mm*0n",
        "skillLevel": "Beginner"
    };
    describe('Add Applicant Tests', function () {
        it('Add Good Applicant', async function(){
            res = await fetch(urlBase + 'applicants', {
                method: "post",
                body: JSON.stringify(appl1),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            assert.equal(res.status, 201);
        });
        it('Too Long JSON Applicant', async function(){
            res = await fetch(urlBase + 'applicants', {
                method: "post",
                body: JSON.stringify(appl2),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            assert.equal(res.status, 500);
        });
        it('Missing Info Applicant', async function(){
            res = await fetch(urlBase + 'applicants', {
                method: "post",
                body: JSON.stringify(appl3),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            assert.notEqual(res.status, 201);
        });
        it('Bad Email Applicant', async function(){
            res = await fetch(urlBase + 'applicants', {
                method: "post",
                body: JSON.stringify(appl4),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            assert.notEqual(res.status, 201);
        });
    });
})
