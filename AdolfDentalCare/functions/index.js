const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
require('dotenv').config()
const nodemailer= require('nodemailer')
const {SENDER_EMAIL,SENDER_PASSWORD} = process.env;

exports.sendEmailNotification = functions.firestore.document('submissions/{docId}')
.onCreate((snap,ctx)=>{
    const data= snap.data();

    let authData= nodemailer.createTransport({
        host:'smtp.gamil.com',
        port:465,
        secure:true,
        auth:{
            user:'adolfdcare@gmail.com',
            pass:'sistemistas' 
        }
    });

    authData.sendMail({
        from: 'adolfdcare@gmail.com',
        to: `${data.email}`,
        subject: `${data.subject}`,
        text : `${data.text}`,
        html:`${data.text}`,
    }).then(res=>
        console.log('successfuly sent that mail'))
        .catch(err=>
            console.log(err));
})


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



// Funcionalidad de clud function que no sabemos implementar 
// export const onUserDelete = functions.database 
// .ref('Usuario/{UsuarioId}')
// .onDelete(async (snapshot, context) =>{
// const userRef = snapshot.ref.parent.parent.child('') 
// })
