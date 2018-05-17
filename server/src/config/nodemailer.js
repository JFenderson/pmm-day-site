import nodemailer from 'nodemailer';


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



export { transporter, }