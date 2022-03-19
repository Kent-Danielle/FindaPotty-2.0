//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyDNZsToCvNbUp4-c56IFGgDeYzyDlBpYNg",
  authDomain: "findapotty-3f22e.firebaseapp.com",
  projectId: "findapotty-3f22e",
  storageBucket: "findapotty-3f22e.appspot.com",
  messagingSenderId: "456779479213",
  appId: "1:456779479213:web:758d2573b1a7989d1aae24",
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
