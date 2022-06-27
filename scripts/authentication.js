// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      var user = authResult.user; //get the user object info
      if (authResult.additionalUserInfo.isNewUser) {
        // create a collection with name "users"
        db.collection("Users")
          //define a document for a user with UID as a document ID
          .doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            join_date: firebase.firestore.FieldValue.serverTimestamp()
          }).then(function () {
            console.log("New user added to firestore");
            window.location.assign("potties.html");
          })
          .catch(function (error) {
            console.log(error);
          })

      } else {
        return true;
      }
      return false;
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'potties.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);