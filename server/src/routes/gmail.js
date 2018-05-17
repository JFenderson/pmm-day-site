import nodemailer from 'nodemailer';
import { Router } from 'express';

let router = Router();

router.get('/', (req, res) => {
    res.send('Server working. Please post at "/contact" to submit a message.');
  });
  
router.post('/', (req, res) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: 'joseph.fenderson@gmail.com',
            clientId: '15915734946-cuije3mk1f0h6bh390rb31fdhos0gjpa.apps.googleusercontent.com',
            clientSecret: 'fJxFiZJLgqsAqtIfQU6w1xbG',
            refreshToken: '1/eVMu8IMRe-tW7e7Z_itySgfclv2TJlMWDPHa4Lja5es',
        }
    });

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

