//Default sorting values
var value = "distance";
var order = "asc";

//-----------------------------------
// Function to sort the list of posts
//-----------------------------------
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
  displayPotties();
}

function displayPotties() {
  let cardTemplate = document.getElementById("pottyTemplate");

  db.collection("Potties")
    .orderBy(value, order)
    .get()
    .then((snap) => {
      
      var i = 1;
      snap.forEach((doc) => {
        var title = doc.data().title;
        var ratings = doc.data().ratings;
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

        //change bookmark icon according to saved state
        if (doc.data().whoBookmarked.includes(currentUser.id)) {
          newcard.querySelector(".favorite").innerHTML = "bookmark";
        } else {
          newcard.querySelector(".favorite").innerHTML = "bookmark_border";
        }

        //display number of likes
        if (doc.data().likes > 1) {
          newcard.querySelector(".likes").innerHTML = doc.data().likes;
        } else {
          newcard.getElementById("likes-row").style.display = "none";
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

        newcard.querySelector(".link-spanner").onclick = () =>
          setPottyData(doc.id);

        document.getElementById("Potties-go-here").appendChild(newcard);
        i++;
      });
    });
}

displayPotties()

//-------------------
// function to search
//-------------------
// Credits: https://www.youtube.com/watch?v=RVrHC__Tkx0&ab_channel=ABNationProgrammers
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

//-----------------------------------------------------------
// Script to toggle/untoggle success indicator after posting
//-----------------------------------------------------------
var b = localStorage.getItem("myValue");
if (b == "clicked") {
  document.getElementById("indicator").style.display = "flex";
  document.getElementById("indicator").style.justifyContent = "center";
}
var resetValue = "";

setTimeout(function () {
  document.getElementById("indicator").style.display = "none";
  localStorage.setItem("myValue", resetValue);
}, 3000);

//------------------------------------------------
// function to save the potty ID in local storage
//------------------------------------------------
function setPottyData(id) {
  localStorage.setItem("pottyID", id);
}