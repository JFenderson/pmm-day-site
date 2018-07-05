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

module.exports = router;