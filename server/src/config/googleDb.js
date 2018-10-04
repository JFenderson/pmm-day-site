import * as admin from 'firebase-admin';
import functions from 'firebase-functions';
import firebase from 'firebase';
import * as serviceAccount from '../../../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

//setting up google storage buckets
  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: '<your-api-key>',
    authDomain: '<your-auth-domain>',
    databaseURL: '<your-database-url>',
    storageBucket: 'gs://pmm-site-a57b9.appspot.com'
  };
  firebase.initializeApp(config);

  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();

export default { db, storage };