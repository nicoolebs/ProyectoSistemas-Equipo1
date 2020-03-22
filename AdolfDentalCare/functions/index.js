const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

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

    exports.onDisableUser = functions.https.onCall(() =>{
        return admin.auth().updateUser(uid,{
            disabled : true
        })
    })
    .then(function(userRecord){
        console.log('Usuario desabilitado correctamente');
      })
      .catch(function(error){
        console.log('Erro desabilitando al usuario:' , error );
      });



      