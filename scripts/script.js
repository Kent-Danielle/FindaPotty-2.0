var currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = db.collection("Users").doc(user.uid); //global

    // the following functions are always called when someone is logged in
  } else {
    // Redirect user if no one is logged in
    window.location.href = "./index.html";
  }
});


//--------------------------------------------------------
// Call this function when the "logout" button is clicked
//--------------------------------------------------------
function logout() {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location.href = "./index.html";
    }).catch((error) => {
      // An error happened.
    });
}

