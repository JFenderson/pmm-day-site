import { Router } from 'express';
import Table from '../utils/table';
import ZipCodes from 'zipcodes';
import human from 'humanparser';
import dotenv from 'dotenv';
dotenv.config();

let router = Router();
let user = new Table('person');
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

  console.log('this is the name from humanparser',name,email,phoneNumber,'this is the location details',location,crabYear);


  members.insert({
    name, email, phoneNumber, location, crabYear
  })
  .then((id) => { 
      console.log(id);
  });
  
  user.insert({
    name, email, phoneNumber, location, crabYear
  })
  .then((id) => { 
      console.log(id);
  });
});


module.exports = router;