function AddUploadListener(restaurantID) {
  const fileInput = document.getElementById(restaurantID + "menufile"); // pointer #1
  const image = document.getElementById(restaurantID + "menu"); // pointer #2

  //attach listener to input file
  //when this file changes, do something
  fileInput.addEventListener("change", function (e) {
    //the change event returns a file "e.target.files[0]"
    var pickedfile = e.target.files[0];
    var blob = URL.createObjectURL(pickedfile);
    //change the DOM img element source to point to this file
    image.src = blob; //assign the "src" property of the "img" tag
    console.log(pickedfile)
    //do database stuff:  add to menu collection
    RegisterNewMenu(restaurantID, pickedfile);
  });
}

AddUploadListener("Whitespot");

function RegisterNewMenu(restID, pickedfile) {
  addMenuDoc(restID, pickedfile);
}

//--------------------------------------------------
// Create a new menu doc
// To get a timestamp of the system to store into firestore field
// use "serverTimestamp()" function
//https://firebase.google.com/docs/firestore/manage-data/add-data#server_timestamp
//--------------------------------------------------
function addMenuDoc(restid, pickedfile) {
  //create the menu document first
  db.collection("Potties")
    .add({
      title: restid + "Bathroom",
      ratings: 4,
      saved: false,
      LGBT_accessible: false,
      diaper_station: true,
      elderly_accessible: true,
      pregnant_accessible: true,
      wheelchair_accessible: true,
    })
    .then(function (doc) {
      //"doc" points to the newly created menu document
      // and doc.id is the auto-generated id for that menu
      storeImage(doc.id, pickedfile);
    });
}

// MIGHT BE USEFUL FOR ACTUAL WRITE FORM HTML
//----------------------------------------------------------------------
// Add the menu's id to the "posted" field for that user
// The field "posted" is an array of the list of posts the user has made
//----------------------------------------------------------------------
// function updateUserDoc(menuid, pickefile) {
//   db.collection("users")
//     .doc(useruid)
//     .set(
//       {
//         posted: firebase.firestore.FieldValue.arrayUnion(menuid),
//       },
//       {
//         merge: true,
//       }
//     )
//     .then(function () {
//       storeImage(menuid, pickedfile);
//     });
// }

//---------------------------------------------------------------
// Let's store the file that was picked onto Cloud Storage using "put()"
// Then, use "getDownloadURL" to get a url to the cloud location.
// Then, store that url in our filebase for the menu document.
//---------------------------------------------------------------
function storeImage(menuid, pickedfile) {
  var storageRef = firebase.storage().ref("images/" + menuid + ".jpg"); // Get reference
  var metadata = {  
    contentType: "image/jpeg",
  };

  // Upload picked file to cloud storage
  storageRef.put(pickedfile, metadata).then(function () {
    storageRef
      .getDownloadURL() //get URL of the uploade file
      .then(function (url) {
        console.log(url); // Save the URL into users collection
        db.collection("Potties").doc(menuid).update({
          potty_pic: url,
        });
      });
  });
}
