'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
const indTix = require('./stripe');
const memberSign = require('./memberSignup');
const emailContact = require('./nodemailer');
//stripe
let charge = indTix.charge;
let send = indTix.send;
//nodemailer
let contactEmail = emailContact.contactEmail;
//member-sign-up
let addMember = memberSign.addMember;
let getMembers = memberSign.getMembers;

app.use(cors);
//stripe
//---for 1 ticket
app.post('/charge/tickets/idv/1', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        charge(req, res, 1000);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});
//--2 tickets
app.post('/charge/tickets/idv/2', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        charge(req, res, 2000);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});
//--3 tickets
app.post('/charge/tickets/idv/3', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        charge(req, res, 3000);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});
//--- 4 tickets
app.post('/charge/tickets/idv/4', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        charge(req, res, 4000);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});
//---5 tickets
app.post('/charge/tickets/idv/5', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        charge(req, res, 5000);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});
//--1 tent space 
app.post('/charge/tickets/tntsp/1', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        charge(req, res, 12000);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});
//-- 2 tent spaces
app.post('/charge/tickets/tntsp/2', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        charge(req, res, 24000);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});
//--3 tent spaces
app.post('/charge/tickets/tntsp/3', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        charge(req, res, 36000);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});

//nodemailer
app.post('/contact', (req, res) => {
    try{
        contactEmail(name, email, message)
    }catch(e){
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
})

//member-sign-up
app.get('/members', (req, res) => {
    try{
        getMembers()
    }catch(e){
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
})
app.post('/members/signup', (req, res) => {
    try{
        addMember()
    }catch(e){
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
})

// Expose the API as a function
exports.api = functions.https.onRequest(app);