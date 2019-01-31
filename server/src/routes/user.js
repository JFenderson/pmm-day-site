import { Router } from 'express';
import Table from '../utils/table';
import ZipCodes from 'zipcodes';
import human from 'humanparser';
import dotenv from 'dotenv';
import db from '../config/googleDb';
import SibApiV3Sdk from 'sib-api-v3-sdk'
import request from 'request';
import { transporter, sendInBlueTransporter, mailgunTransporter} from '../config/nodemailer';
dotenv.config();

let router = Router();
let members = new Table('members');
let pmmMember = db.firestore.collection('pmmMembers').doc();
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_V3;


router.get('/', (req, res) => {
  pmmMember.get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      res.json(doc.data());
    })
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  })
})

router.post('/signup', (req, res) => {
  let { email, phoneNumber, crabYear} = req.body;
  let name = human.parseName(req.body.name);
  let location = ZipCodes.lookup(req.body.location);
  var apiInstance = new SibApiV3Sdk.ContactsApi();
  var createContact = new SibApiV3Sdk.CreateContact(email);
  var contactEmails = new SibApiV3Sdk.AddContactToList(email); // AddContactToList | Emails addresses of the contacts
 
  let data = {
    firstName: name.firstName,
    lastName: name.lastName,
    email: email,
    phoneNumber: phoneNumber,
    city: location.city,
    state: location.state,
    crabYear: crabYear
  }

  var options = { "email": email,
  "attributes": {
    "FName": data.firstName,
    "LName": data.lastName,
    "phone": data.phoneNumber
  }};

  // // var createContact = new SibApiV3Sdk.CreateContact();
  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);

  //   console.log(body);
  // });

  // apiInstance.addContactToList(contactEmails)
  // .then(function(data) {
  //   console.log('API called successfully. Returned data: ' + data);
  // }, function(error) {
  //   console.error(error);
  // });

  apiInstance.createContact(options)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })
    

  const mailOption = {
    from: `fenderson.joseph@gmail.com`,// who the email is coming from..in the contact form
    to: `${name} <${email}>`,//who the email is going to
    subject: `Thank you for Signing Up to the PMM Weekend Site`,//subject line
    html: `
    <div style="text-align: center;">
      <h1>Hello <span style="color: purple;">${name.firstName} ${name.lastName}</span>,</h1> 
      <h2>Thank you signing up. You have been added to the PMM Database which will be used to contact you for future events such as road trips to support the band, band schedules and more currently in the works.</h2>
      <h3>Our goal is to build and get every person that marched as PMM in our database so that we can have a directory. With your help we can get there so spread the word to sign up from the website.</h3>
      <h1 style="color: purple"><span style="color: gold;">P</span>MM 1X!!!</h1>
      <p>If you do not wish to be contacted please repond to this email saying <strong>"PLEASE REMOVE"</strong> and you will be removed from the listing.</p>
    </div>`,
};


pmmMember.set(data)
.then((ref) => {
  res.json(ref.writeTime.toDate());
  console.log('added!')
})
.then((res) => {
  console.log(res);
  transporter.sendMail(mailOption,(error, res)=> {
    if (error) {
        console.log(error);
    } else {
        console.log('email sent!')
        res.sendStatus(201);
    }
    transporter.close();
  })
})
.catch((err)=> {
  console.log('There was an error posting users',err);
})
})



module.exports = router;