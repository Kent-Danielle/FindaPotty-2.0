var value = "ratings";

function sort() {
    let list = document.getElementById('list');
    value = list.options[list.selectedIndex].text;
    console.log("The selected value=" + value);

    if(value == "Rating") {
      value = "ratings"
    }
    if (value == "Distance") {
      value = "distance";
    }
    document.getElementById("Potties-go-here").innerHTML = "";
    displayPotties("Potties");
}

function displayPotties(collection) {
  let cardTemplate = document.getElementById("pottyTemplate");

  db.collection(collection)
    .orderBy(value, "desc")
    .get()
    .then((snap) => {
      var i = 1;
      snap.forEach((doc) => {
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

        //change heart icon according to saved state
        if (doc.data().whoBookmarked.includes(currentUser.id)) {
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

function searchProduct() {
  const searchInput = document.getElementById("filter").value.toUpperCase();
  const cardContainer = document.getElementById("Potties-go-here");

  const cards = cardContainer.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].querySelector(".card-body h3.card-title");

    if (title.innerText.toUpperCase().indexOf(searchInput) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}
