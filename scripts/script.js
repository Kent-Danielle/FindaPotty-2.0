// function to get a global variable for the user
var currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    currentUser = db.collection("Users").doc(user.uid); //global
    console.log(currentUser);

    // the following functions are always called when someone is logged in
  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});


//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
  console.log("logging out user");
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
    }).catch((error) => {
      // An error happened.
    });
}

