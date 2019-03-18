const human = require('humanparser');
const ZipCodes = require('zipcodes');
const nodemailer = require('./nodemailer');
const functions = require('firebase-functions');
const sendinblue = require('sib-api-v3-sdk');
let transporter = nodemailer.transporter;
const admin = require('firebase-admin');
let pmmMember = admin.firestore().collection('pmmMembers').doc();
let defaultClient = sendinblue.ApiClient.instance
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = functions.config().sendinblue.v3;

let addMember = () => {
    var apiInstance = new sendinblue.ContactsApi();
    var createContact = new sendinblue.CreateContact(email);
    var contactEmails = new sendinblue.AddContactToList(email); 
    let { email, phoneNumber, crabYear} = req.body;
    let name = human.parseName(req.body.name);
    let location = ZipCodes.lookup(req.body.location);
    let data = {
        firstName: name.firstName,
        lastName: name.lastName,
        email: email,
        phoneNumber: phoneNumber,
        city: location.city,
        state: location.state,
        crabYear: crabYear
      }

      apiInstance.createContact(options)
      .then((data) => {
        return data
      })
      .catch((error) => {
        throw error;
      })

      pmmMember.set(data)
      .then(ref => {
           return ref.writeTime.toDate();
        })
        .then(
          transporter.sendMail(mailOption,(error, res)=> {
            if (error) {
                throw error;
            } else {
                console.log('email sent!')
                res.sendStatus(201);
            }
            transporter.close();
          })
        )
        .catch((err)=> {
          console.log('There was an error posting users',err);
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
    
}

let getMembers = () => {
    pmmMember.get()
    .then((snapshot) => {
        return snapshot.forEach((doc) => {
         res.json(doc.data());
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    })
}

module.exports = {addMember, getMembers}; 
