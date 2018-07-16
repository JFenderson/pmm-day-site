import { Router } from 'express';
import Table from '../utils/table';
import ZipCodes from 'zipcodes';
import human from 'humanparser';
import dotenv from 'dotenv';
dotenv.config();

let router = Router();
let members = new Table('members');


router.get('/', (req,res)=> {
 members.getAll()
 .then((res)=> console.log(res.json()))
 .then(res.sendStatus(200))
})


router.post('/', (req, res) => {
  let { email, phoneNumber, crabYear} = req.body;
  let name = human.parseName(req.body.name);
  let location = ZipCodes.lookup(req.body.location);

  members.insert({
    firstName: name.firstName,lastName: name.lastName, email, phoneNumber, city: location.city, state: location.state, crabYear
  })
  .then((id) => { 
      console.log(id);
  });
  
});


module.exports = router;