import nodemailer from 'nodemailer';
import { Router } from 'express';
import { transporter } from '../config/nodemailer';

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
        to: 'purplemarchingmachinepicnic96@gmail.com',//who the email is going to
        subject: `New Message from ${email} from the PMM Weekend Site`,//subject line
        text: message,
        html: `<p>${message}, Sender's Number is ${number}</p>`,
    };

    transporter.sendMail(mailOption,(error, res)=> {
        if (error) {
            res.send(error)
        } else {
            console.log('email sent!')
            res.sendStatus(201);
        }
        transporter.close();
    });
 });

export default router;

