import { Router } from 'express';
import firebase from "firebase";
import Table from '../utils/table';
import admin from 'firebase-admin';
import fs from 'fs';

let router = Router();
let user = new Table('person');


admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

var db = admin.firestore();

router.post('/', (req, res) => {
  const { name, email, phoneNumber, location, crabYear} = req.body;
  user.insert({
    name, email, phoneNumber, location, crabYear
  })
  .then((id) => { 
      console.log(id);
  });

  var docRef = db.collection('members');

  var setData = docRef.set({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    location: location,
    crabYear: crabYear
  });
  
});

module.exports = router;