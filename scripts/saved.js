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

          //check for ratings
          for (i = 0; i < ratings; i++) {
            starRatings =
              starRatings + "<i class='text-warning material-icons'>star</i>";
          }
          newcard.querySelector(".rating").innerHTML = starRatings;

          //check for features
          if (doc.data().elderly_accessible == true) {
            features += "<i class='text-success material-icons'>elderly</i>";
          }
          if (doc.data().wheelchair_accessible == true) {
            features += "<i class='text-success material-icons'>accessible</i>";
          }
          if (doc.data().diaper_station == true) {
            features +=
              "<i class='text-success material-icons'>baby_changing_station</i>";
          }
          if (doc.data().pregnant_accessible == true) {
            features +=
              "<i class='text-success material-icons'>pregnant_woman</i>";
          }
          if (doc.data().LGBT_accessible == true) {
            features +=
              "<i class='text-success material-icons'>transgender</i>";
          }
          newcard.querySelector(".features").innerHTML = features;

          //change heart icon according to saved state
          if (doc.data().saved == true) {
            newcard.querySelector(".favorite").innerHTML = "favorite";
          } else {
            newcard.querySelector(".favorite").innerHTML = "favorite_border";
          }

          document.getElementById(collection + "-go-here").appendChild(newcard);
          i++;
        } else {
          i++;
        }
      });
    });
}

displayPotties("Potties");
