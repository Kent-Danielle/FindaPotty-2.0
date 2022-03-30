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
        let newcard = cardTemplate.content.cloneNode(true);

        if (doc.data().saved == true) {
          //update card
          //title
          newcard.querySelector("#pottyTitle").innerHTML = title;

          //update image
          if (doc.data().potty_pic != null) {
            newcard.querySelector("#pottyImage").src = doc.data().potty_pic;
          }

          //check for ratings
          for (n = 0; n < ratings; n++) {
            starRatings =
              starRatings + "<i class='text-warning material-icons'>star</i>";
          }
          newcard.querySelector(".rating").innerHTML = starRatings;

          //check for features
          if (doc.data().elderly_accessible == true) {
            features += "<i class='text-accent material-icons'>elderly</i>";
          }
          if (doc.data().wheelchair_accessible == true) {
            features += "<i class='text-accent material-icons'>accessible</i>";
          }
          if (doc.data().diaper_station == true) {
            features +=
              "<i class='text-accent material-icons'>baby_changing_station</i>";
          }
          if (doc.data().pregnant_accessible == true) {
            features +=
              "<i class='text-accent material-icons'>pregnant_woman</i>";
          }
          if (doc.data().LGBT_accessible == true) {
            features += "<i class='text-accent material-icons'>transgender</i>";
          }

          newcard.querySelector(".link-spanner").onclick = () =>
            setPottyData(doc.id);

          document.getElementById("Bookmarks-go-here").appendChild(newcard);
          i++;
        } else {
          i++;
        }
      });
    });
}

displayPotties("Potties");

function setPottyData(id) {
  localStorage.setItem("pottyID", id);
}
