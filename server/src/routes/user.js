import { Router } from 'express';
import firebase from "firebase";
import Table from '../utils/table';
import fs from 'fs';

let router = Router();
let user = new Table('person');

router.post('/', (req, res) => {
  const { name, email, phoneNumber, location, crabYear} = req.body;
  user.insert({
    name, email, phoneNumber, location, crabYear
  })
  .then((id) => { 
      console.log(id);
  });
});
//   // Initialize Firebase
//   var config = {
//     apiKey: process.env.FIREBASE_APIKEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
//   };
//   firebase.initializeApp(config);

// router.post('/', (req,res)=> {
//     const { name, email, location, crabYear } = req.body;

// })

module.exports = router;