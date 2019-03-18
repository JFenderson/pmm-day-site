const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const gmailEmail = functions.config().gmail.user;
const gmailPassword = functions.config().gmail.password;
const gmailClientId = functions.config().gmail.clientid;
const gmailClientSecret = functions.config().gmail.clientsecret;
const gmailRToken = functions.config().gmail.refreshtoken;
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    secure: true,
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
        clientId: gmailClientId,
        clientSecret: gmailClientSecret,
        refreshToken: gmailRToken
    },
});

let contactEmail = () => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const mailOption = {
        from: `${name} <${email}>`,// who the email is coming from..in the contact form
        to: 'joseph.fenderson@gmail.com',//who the email is going to
        subject: `New Message from ${email} from the PMM Weekend Site`,//subject line
        text: message,
        html: `<div style="text-align: center; margin: auto; margin-right: auto 0; border: 1px solid; padding: 10px; width: 50%; height: auto;">
        <h1>Hey PMM Admin,</h1> 
        <h1>You have a new message from the PMM Weekend Site</h1>
        <h2>From: ${name}</h2>
        <h2>Message:</h2>
        <h2>${message} </h2>
      </div>`,
    };



    transporter.sendMail(mailOption,(error, res)=> {
        if (error) {
            console.log(error);
        } else {
            console.log('email sent!')
            res.sendStatus(201);
        }
        transporter.close();
    });
}
module.exports = {contactEmail, transporter }