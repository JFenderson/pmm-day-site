import { Router } from 'express';
import firebase from "firebase";
import Table from '../utils/table';
import admin from 'firebase-admin';
import fs from 'fs';

let router = Router();
let user = new Table('person');
let members = new Table('members');

//firebase init
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

var db = admin.firestore();

router.get('/', (req,res)=> {
 members.getAll()
 .then((res)=> console.log(res.json()))
 .then(res.sendStatus(200))
})

router.post('/', (req, res) => {
  const { name, email, phoneNumber, location, crabYear} = req.body;
  console.log(name,email,phoneNumber,location,crabYear);
  members.insert({
    name, email, phoneNumber, location, crabYear
  })
  .then((id) => { 
      console.log(id);
  });

// db.collection('members').add({
//     name: name,
//     email: email,
//     phoneNumber: phoneNumber,
//     location: location,
//     crabYear: crabYear
// })
//   .then(function (docRef) {
//     console.log('Document written with ID: ', docRef.id)
//   })
//   .catch(function (error) {
//     console.error('Error adding document: ', error)
//   })
});


module.exports = router;