async function loadPotty(pottyID, collection) {
  let cardTemplate = document.getElementById("pottyTemplate");

  let pottyRef = db.collection(collection).doc(pottyID);
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
  }

  //public or private
  newcard.getElementById("privacy").innerHTML = doc.data().isPublic

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

  document.getElementById("detail").innerText = doc.data().detail;

  document.getElementById("Potty-go-here").appendChild(newcard);


}

let pottyID = localStorage.getItem("pottyID");
loadPotty(pottyID, "Potties");

