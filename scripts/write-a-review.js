function writePost() {
  let rating = document.getElementById("star-rating").value;
  let review = document.getElementById("review").value;
  let pottyID = localStorage.getItem("pottyID");

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      var currentUser = db.collection("Users").doc(user.uid);
      var userID = user.uid;
      var author = await currentUser.get();
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        db.collection("Reviews")
          .add({
            author: author.data().name,
            userID: userID,
            pottyID: pottyID,
            ratings: rating,
            review: review,
            potty_pic: "",
            date_posted: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(async (doc) => {
            
            const image = document.getElementById("potty-image");
            console.log(typeof image.files[0] != undefined)
            if (typeof image.files[0] != "undefined"){
              console.log("Hi")
              var storingImg = await storeImage(doc.id, image.files[0]);
            } else {
              window.location.href = "potty.html";
            }
            
          })
      });
    } else {
      // No user is signed in.
    }
  });
}

function storeImage(reviewID, pickedfile) {
  var storageRef = firebase.storage().ref("images/" + reviewID + ".jpg"); // Get reference
  var metadata = {
    contentType: "image/jpeg",
  };

  // Upload picked file to cloud storage
  storageRef.put(pickedfile, metadata).then(async function () {
    await storageRef
      .getDownloadURL() //get URL of the uploade file
      .then(function (url) {
        console.log(url); // Save the URL into users collection
        db.collection("Reviews").doc(reviewID).update({
          potty_pic: url,
        });

        window.location.href = "potty.html";
      });
  });
}

// Set a value in local storage to signal the app that a new post has been created
document.getElementById("post-potty").addEventListener("click", (e) => {
  e.preventDefault()
  writePost()
  var a = "clicked";
  localStorage.setItem("myValue", a);
});
