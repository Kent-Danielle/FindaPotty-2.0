function writePost() {
  let Title = document.getElementById("inputTitle").value;
  let Location = document.getElementById("location").value;
  let Ratings = document.getElementById("star-rating").value;
  let Detail = document.getElementById("description").value;
  let accessibleCheck = document.querySelector("#accessibleCheck").checked;
  let childCheck = document.querySelector("#childCheck").checked;
  let transgenderCheck = document.querySelector("#transgenderCheck").checked;
  let distance1 = document.getElementById("distance1");
  let distance2 = document.getElementById("distance2");
  let distance3 = document.getElementById("distance3");
  let Distance;

  if (distance1.checked) {
    Distance = "100m";
  }
  if (distance2.checked) {
    Distance = "100m-300m";
  } 
  if (distance3.checked) {
    Distance = "300m";
  }

  let Public;
  if (document.getElementById("public").checked) {
    Public = "Public";
  } else {
    Public = "Private";
  }

  //console.log(Title, Location, Description, elderCheck, accessibleCheck, pregnantCheck, childCheck, transgenderCheck);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("Users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        db.collection("Potties")
          .add({
            userID: userID,
            title: Title,
            ratings: Ratings,
            detail: Detail,
            distance: Distance,
            mobility_accessible: accessibleCheck,
            diaper_station: childCheck,
            gender_neutral: transgenderCheck,
            isPublic: Public,
            potty_pic: "",
            saved: false,
            whoBookmarked: [],
          })
          .then((doc) => {
            console.log(doc.id);
            const image = document.getElementById("potty-image");
            storeImage(doc.id, image.files[0]);
          });
      });
    } else {
      // No user is signed in.
    }
  });
}

function storeImage(pottyid, pickedfile) {
  var storageRef = firebase.storage().ref("images/" + pottyid + ".jpg"); // Get reference
  var metadata = {
    contentType: "image/jpeg",
  };

  // Upload picked file to cloud storage
  storageRef.put(pickedfile, metadata).then(function () {
    storageRef
      .getDownloadURL() //get URL of the uploade file
      .then(function (url) {
        console.log(url); // Save the URL into users collection
        db.collection("Potties").doc(pottyid).update({
          potty_pic: url,
        });

        window.location.href = "potties.html";
      });
  });
}
