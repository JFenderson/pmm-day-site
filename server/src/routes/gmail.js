import nodemailer from 'nodemailer';
import { Router } from 'express';

let router = Router();

router.get('/', (req, res) => {
    res.send('Server working. Please post at "/contact" to submit a message.');
  });
  
router.post('/', (req, res, next) => {
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
        from: `${name} <${email}>`,
        to: `${email}`,
        subject: `New Message from ${email} at pmm_day-site`,
        text: message,
        html: `<p>${message}, Sender's Number is ${number}</p>`,
    };

    transporter.sendMail(mailOption,(error, res)=> {
        // console.log(info)
        if (error) {
            console.log('this is the error', error);
            console.log(`these are the req.body.name: ${name}`);
            console.log(`req.body.email:  ${email}`);
            console.log(`req.body.number:  ${number}`);
            console.log(`req.body.message:  ${message}`);
        } else {
            res.sendStatus(201);
        }
        transporter.close();
    });
    next();
    console.log(req.body);
 });

export default router;

