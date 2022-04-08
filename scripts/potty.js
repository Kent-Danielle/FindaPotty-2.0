//Fetch localStorage and assign it to a variable
var pottyID = localStorage.getItem("pottyID");

//---------------------------------------------------------
// function to get a global variable for the user and potty
//---------------------------------------------------------
var currentUser;
var currentPotty;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = db.collection("Users").doc(user.uid); //global
    currentPotty = db.collection("Potties").doc(pottyID); //global
    loadPotty(pottyID);
  } else {
    window.location.href = "./index.html";
  }
});

async function loadPotty(pottyID) {
  let cardTemplate = document.getElementById("pottyTemplate");

  let pottyRef = db.collection("Potties").doc(pottyID);
  const doc = await pottyRef.get();

  var title = doc.data().title; //get potty title
  var ratings = doc.data().ratings; //get potty ratings (integer)
  var starRatings = "";
  var features = "";
  let newcard = cardTemplate.content.cloneNode(true);

  //update card
  //title
  newcard.querySelector("#pottyTitle").innerHTML = title;

  //update image
  if (doc.data().potty_pic != null) {
    newcard.querySelector("#pottyImage").src = doc.data().potty_pic;
    displayPhotos(doc.data().potty_pic);
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

  //checks or unchecks the recommendation prompt
  if (doc.data().whoRecommended.includes(currentUser.id)) {
    document.getElementById("helpful-checkbox").checked = true;
  } else {
    document.getElementById("helpful-checkbox").checked = false;
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

  document.getElementById("detail").innerText = doc.data().detail;
  
  document.getElementById("date_created").innerText = doc
    .data()
    .date_posted.toDate()
    .toDateString();
  console.log(doc.data().date_posted.toDate().toDateString());

  displayDetails(doc.data().detail, doc.data().userID);

  document.getElementById("Potty-go-here").appendChild(newcard);
}

//---------------------------------------
// Display the details on the details tab
//---------------------------------------
async function displayDetails(detail, authorID) {
  document.getElementById("detail").innerText = detail;
  let author = db.collection("Users").doc(authorID);
  let doc = await author.get();
  document.getElementById("author").innerText = doc.data().name;
}

//---------------------------------------
// Display the photos on the photos tab
//---------------------------------------
function displayPhotos(picURL) {
  document.getElementById("pottyPhotos").src = picURL;
}

//---------------------------------------
// function to add or remove a bookmark
//---------------------------------------
function bookmark() {
  if (document.querySelector(".favorite").innerHTML == "bookmark_border") {
    currentPotty.set(
      {
        whoBookmarked: firebase.firestore.FieldValue.arrayUnion(currentUser.id),
      },
      {
        merge: true,
      }
    );

    currentUser
      .set(
        {
          bookmarks: firebase.firestore.FieldValue.arrayUnion(pottyID),
        },
        {
          merge: true,
        }
      )
      .then(function () {
        document.querySelector(".favorite").innerHTML = "bookmark";
        console.log("bookmark has been saved for: " + currentUser);
        db.collection("Potties").doc(pottyID).update({
          saved: true,
        });
      });
  } else {
    currentPotty.set(
      {
        whoBookmarked: firebase.firestore.FieldValue.arrayRemove(
          currentUser.id
        ),
      },
      {
        merge: true,
      }
    );

    currentUser
      .set(
        {
          bookmarks: firebase.firestore.FieldValue.arrayRemove(pottyID),
        },
        {
          merge: true,
        }
      )
      .then(function () {
        document.querySelector(".favorite").innerHTML = "bookmark_border";
        console.log("bookmark has been removed for: " + currentUser);
        db.collection("Potties").doc(pottyID).update({
          saved: false,
        });
      });
  }
}

//--------------------------------------------------------------------------
// Increments the number of likes when the Recommendation prompt is checked
//--------------------------------------------------------------------------
async function sendFeedback() {
  var checkbox = document.getElementById("helpful-checkbox");

  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);

  var doc = await currentPotty.get();
  var whoRecommended = doc.data().whoRecommended;

  if (whoRecommended.includes(currentUser.id)) {
    if (checkbox.checked) {
      console.log("Increasing");
      currentPotty.update({
        likes: increment,
      });
    } else if (!checkbox.checked) {
      //u remove it here then decrement hehe
      currentPotty
        .set(
          {
            whoRecommended: firebase.firestore.FieldValue.arrayRemove(
              currentUser.id
            ),
          },
          {
            merge: true,
          }
        )
        .then(function () {
          console.log("Decreasing");
          currentPotty.update({
            likes: decrement,
          });
        });
    }
  } else {
    currentPotty
      .set(
        {
          whoRecommended: firebase.firestore.FieldValue.arrayUnion(
            currentUser.id
          ),
        },
        {
          merge: true,
        }
      )
      .then(function () {
        console.log("Added user");
        currentPotty.update({
          likes: increment,
        });
      });
  }
}
