import { Router } from 'express';
import Table from '../utils/table';
import ZipCodes from 'zipcodes';
import human from 'humanparser';
import dotenv from 'dotenv';
import { transporter, sendInBlueTransporter, mailgunTransporter } from '../config/nodemailer';
dotenv.config();

let router = Router();
let members = new Table('members');


router.get('/', (req,res)=> {
 members.getAll()
 .then( (info) => res.json(info))
 .catch((err)=> {
  console.log(err);
})
})


router.post('/', (req, res) => {
  let { email, phoneNumber, crabYear} = req.body;
  let name = human.parseName(req.body.name);
  let location = ZipCodes.lookup(req.body.location);
  console.log(location)
  console.log(name)

  const mailOption = {
    from: `fenderson.joseph@gmail.com`,// who the email is coming from..in the contact form
    to: `${name} <${email}>`,//who the email is going to
    subject: `Thank you for Signing Up to the PMM Weekend Site`,//subject line
    html: `
    <div style="text-align: center;">
      <h1>Hello <span style="color: purple;">${name.firstName}</span>,</h1> <h2>Thank you signing up. You have been added to the PMM Database which will be used to contact you for future events such as road trips to support the band, band schedules and more currently in the works.</h2>
      <h3>Our goal is to build and get every person that marched as PMM in our database so that we can have a directory. With your help we can get there so spread the word to sign up from the website.</h3>
      <h1 style="color: purple"><span style="color: gold;">P</span>MM 1X!!!</h1>
      <p>If you do not wish to be contacted please repond to this email saying <strong>"PLEASE REMOVE"</strong> and you will be removed from the listing.</p>
    </div>`,
};



  members.insert({
    firstName: name.firstName,
    lastName: name.lastName, 
    email, 
    phoneNumber, 
    city: location.city, 
    state: location.state, 
    crabYear
  })
  .then((id) => { 
      res.json(id);
  })
  .catch((err)=> {
    console.log(err);
  })
  .then(res => {
    console.log(res);
    transporter.sendMail(mailOption,(error, res)=> {
      if (error) {
          console.log(error);
      } else {
          console.log('email sent!')
          res.sendStatus(201);
      }
      transporter.close();
    });

    mailgunTransporter.sendMail(mailOption, (error, info)=> {
      if (error) {
          console.log(error);
      } else {
          console.log('email sent!')
          console.log(info)
      }
      transporter.close();
    })    
  })


});



module.exports = router;