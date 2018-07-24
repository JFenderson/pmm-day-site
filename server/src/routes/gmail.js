import nodemailer from 'nodemailer';
import { Router } from 'express';
import { transporter, sendInBlueTransporter, mailgunTransporter } from '../config/nodemailer';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';
dotenv.config();

let router = Router();

router.get('/', (req, res) => {
    res.send('Server working. Please post at "/contact" to submit a message.');
  });
  
router.post('/', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const message = req.body.message;
    const mailOption = {
        from: `${name} <${email}>`,// who the email is coming from..in the contact form
        to: 'joseph.fenderson@gmail.com',//who the email is going to
        subject: `New Message from ${email} from the PMM Weekend Site`,//subject line
        text: message,
        html: `<p>${message}, Sender's Number is ${number}</p>`,
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

    // sendInBlueTransporter.sendMail(mailOption, (error, res) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('email sent!')
    //         res.sendStatus(201);
    //     }
    //     transporter.close();
    // });

    mailgunTransporter.sendMail(mailOption, (error, info)=> {
        if (error) {
            console.log(error);
        } else {
            console.log('email sent!')
            console.log(info)
        }
        transporter.close();
    })

});

export default router;

