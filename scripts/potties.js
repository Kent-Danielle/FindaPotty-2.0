var value = "ratings";
var order = "desc";

function sort() {
  let list = document.getElementById("list");
  value = list.options[list.selectedIndex].value;
  console.log("The selected value=" + value);

  if (value == "distance") {
    order = "asc";
  } else {
    order = "desc";
  }

  document.getElementById("Potties-go-here").innerHTML = "";
  displayPotties("Potties");
}

function displayPotties(collection) {
  let cardTemplate = document.getElementById("pottyTemplate");

  db.collection(collection)
    .orderBy(value, order)
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

        if (doc.data().likes > 1) {
          newcard.querySelector(".likes").innerHTML = doc.data().likes;
        } else {
          newcard.getElementById("likes-row").style.display =
            "none";
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

// function indicator() {
var b = localStorage.getItem("myValue");
if (b == "clicked") {
  document.getElementById("indicator").style.display = "flex";
  document.getElementById("indicator").style.justifyContent = "center";
}
var resetValue = "";
console.log(b);

setTimeout(function () {
  document.getElementById("indicator").style.display = "none";
  localStorage.setItem("myValue", resetValue);
}, 5000);
// }
