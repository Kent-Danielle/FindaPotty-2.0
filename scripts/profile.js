// function to get a global variable for the user
var currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = db.collection("Users").doc(user.uid); //global
    console.log(currentUser);

    // the following functions are always called when someone is logged in
    insertNameAndDate();
  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});


function insertNameAndDate() {
  // to check if the user is logged in:
  // let me to know who is the user that logged in to get the UID
  currentUser.get().then((userDoc) => {
    //get the user name
    var user_Name = userDoc.data().name;
    var user_Date = userDoc.data().join_date;
    $("#username").text(user_Name); //jquery
    // $("#userdate").text(user_Date); //jquery
  });
}