import * as admin from 'firebase-admin';
import functions from 'firebase-functions';
import * as serviceAccount from '../../../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pmm-site-a57b9.firebaseio.com"
});

var db = admin.firestore();

export default db;