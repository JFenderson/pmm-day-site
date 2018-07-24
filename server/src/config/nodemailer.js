import nodemailer from 'nodemailer';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import sendinblue from 'nodemailer-sendinblue-transport';
import mg  from 'nodemailer-mailgun-transport';
import dotenv from 'dotenv';
dotenv.config();


var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'joseph.fenderson@gmail.com',
        clientId:"15915734946-cuije3mk1f0h6bh390rb31fdhos0gjpa.apps.googleusercontent.com",
        clientSecret: "fJxFiZJLgqsAqtIfQU6w1xbG",
        refreshToken: "1/eVMu8IMRe-tW7e7Z_itySgfclv2TJlMWDPHa4Lja5es",
    }
});

var sendInBlueTransporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    service: 'SendinBlue',
    auth:{
        user: 'fenderson.joseph@gmail.com',
        pass: '6q1rVFDOBIG3Rg0U'
    }
});

let mgAuth = {
    auth: {
        api_key: 'key-e73adf48b4acfc0a35cdc70b431faa0c',
        domain: 'sandboxde3a03b6aac24cd5aee0550866383b54.mailgun.org'
    }
}

var mailgunTransporter = nodemailer.createTransport(mg(mgAuth))



export { transporter, sendInBlueTransporter, mailgunTransporter }