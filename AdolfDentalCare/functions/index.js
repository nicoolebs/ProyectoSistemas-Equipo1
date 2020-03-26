const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();
require('dotenv').config();

const {
    SENDER_EMAIL,
    SENDER_PASSWORD
} = process.env;

exports.sendEmailNotification = functions.firestore.document('Correos/{docId}')
    .onCreate((snapshot, context) => {
        const data = snapshot.data();

        let authData = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: SENDER_EMAIL,
                pass: SENDER_PASSWORD
            }
        });

        authData.sendMail({
            from: 'adolfdcare@gmail.com',
            to: `${data.email}`,
            subject: `${data.asunto}`,
            text: `${data.texto}`,
            html: `${data.texto}`
        }).then(res => console.log('Email enviado exitosamente')).catch(err => console.log(err));

    });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
