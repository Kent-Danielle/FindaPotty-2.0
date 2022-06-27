//------------------------------------------------
// function to get a global variable for the user
//------------------------------------------------
var currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = db.collection("Users").doc(user.uid); //global

    // the following functions are always called when someone is logged in
    insertNameAndDate();
    displayPotties("Potties");
    displayBookmarks(user);
  } else {
    // No user is signed in.
    window.location.href = "index.html";
  }
});

//-------------------------------------------------
// function to insert User's username and join date
//-------------------------------------------------
function insertNameAndDate() {
  // to check if the user is logged in:
  // let me to know who is the user that logged in to get the UID
  currentUser.get().then((userDoc) => {
    //get the user name
    var user_Name = userDoc.data().name;
    var user_Date = userDoc.data().join_date.toDate().toDateString();
    var user_JoinDate = "Joined: " + user_Date;
    $("#username").text(user_Name); //jquery
    $("#userdate").text(user_JoinDate); //jquery
  });
}

//-------------------------------------------
// function to display Potties posted by user
//-------------------------------------------
function displayPotties(collection) { 

  db.collection(collection)
    .where("userID", "==", currentUser.id)
    .get()
    .then((snap) => {
      var i = 1;
      snap.forEach((doc) => {
        display(doc.id, "Potties");
        i++;
      });
    });
}

//-------------------------------------------------------
// function to fetch the id of Potties bookmarked by user
//-------------------------------------------------------
function displayBookmarks(user) {
  db.collection("Users")
    .doc(user.uid)
    .get()
    .then((userDoc) => {
      var bookmarks = userDoc.data().bookmarks;

      bookmarks.forEach((pottyID) => {
        display(pottyID, "Bookmarks");
      });
    });
}

//-----------------------------------------------
// function to display Potties bookmarked by user
//-----------------------------------------------
async function display(pottyID, container) {
  let cardTemplate = document.getElementById("pottyTemplate");
  let doc = await db.collection("Potties").doc(pottyID).get();

  var title = doc.data().title;
  var ratings = doc.data().ratings;
  var starRatings = "";
  var features = "";
  let newcard = cardTemplate.content.cloneNode(true);

  //update card
  //title
  newcard.querySelector("#pottyTitle").innerHTML = title;

  //update image
  if (doc.data().potty_pic != null) {
    newcard.querySelector("#pottyImage").src = doc.data().potty_pic;
  }

  //public or private
  newcard.getElementById("privacy").innerHTML = doc.data().isPublic;

  //check for ratings
  for (n = 0; n < ratings; n++) {
    starRatings =
      starRatings + "<i class='text-warning material-icons'>star</i>";
  }
  newcard.querySelector(".rating").innerHTML = starRatings;

  //check for features
  if (doc.data().mobility_accessible == true) {
    features += "<i class='text-accent material-icons'>accessible</i>";
  }
  if (doc.data().diaper_station == true) {
    features +=
      "<i class='text-accent material-icons'>baby_changing_station</i>";
  }
  if (doc.data().gender_neutral == true) {
    features += "<i class='text-accent material-icons'>transgender</i>";
  }
  newcard.querySelector(".features").innerHTML = features;

  //change bookmark icon according to saved state
  if (doc.data().whoBookmarked.includes(currentUser.id)) {
    newcard.querySelector(".favorite").innerHTML = "bookmark";
  } else {
    newcard.querySelector(".favorite").innerHTML = "bookmark_border";
  }

  //display number of likes
  if (doc.data().likes > 1) {
    newcard.querySelector(".likes").innerHTML = doc.data().likes;
  } else {
    newcard.getElementById("likes-row").style.display = "none";
  }

  //displays the distance
  let distance;
  if (doc.data().distance == "100m") {
    distance = "< " + doc.data().distance;
  } else if (doc.data().distance == "300m") {
    distance = "> " + doc.data().distance;
  } else {
    distance = doc.data().distance;
  }

  newcard.getElementById("distance").innerHTML = distance;

  newcard.querySelector(".link-spanner").onclick = () => setPottyData(doc.id);

  document.getElementById(container + "-go-here").appendChild(newcard);
}

//------------------------------------------------
// function to save the potty ID in local storage
//------------------------------------------------
function setPottyData(id) {
  localStorage.setItem("pottyID", id);
}
