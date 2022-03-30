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

function displayPotties(collection) {
  let cardTemplate = document.getElementById("pottyTemplate");

  db.collection(collection)
    .get()
    .then((snap) => {
      var i = 1;
      snap.forEach((doc) => {
        var title = doc.data().title; //get potty title
        var ratings = doc.data().ratings; //get potty ratings (integer)
        var starRatings = "";
        var features = "";
        var privacy = "";
        let newcard = cardTemplate.content.cloneNode(true);

        //update card
        //title
        newcard.querySelector("#pottyTitle").innerHTML = title;

        //update image
        if (doc.data().potty_pic != null) {
          newcard.querySelector("#pottyImage").src = doc.data().potty_pic;
        }

        //public or private
        if (doc.data().isPublic) {
          privacy =
            "<p class='fit-content bg-info text-white p-1 rounded-3 fs-7'>public</p>";
        } else {
          privacy =
            "<p class='fit-content bg-info text-white p-1 rounded-3 fs-7'>private</p>";
        }
        newcard.querySelector("#privacy").innerHTML = privacy;

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

        //change heart icon according to saved state
        if (doc.data().saved == true) {
          newcard.querySelector(".favorite").innerHTML = "bookmark";
        } else {
          newcard.querySelector(".favorite").innerHTML = "bookmark_border";
        }

        newcard.querySelector(".link-spanner").onclick = () =>
          setPottyData(doc.id);

        document.getElementById(collection + "-go-here").appendChild(newcard);
        i++;
      });
    });
}

displayPotties("Potties");

function setPottyData(id) {
  localStorage.setItem("pottyID", id);
}

