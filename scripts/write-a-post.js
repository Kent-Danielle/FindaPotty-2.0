function writePost() {
    console.log("in")
    let Title = document.getElementById("inputTitle").value;
    let Location = document.getElementById("location").value;
    let Ratings = document.getElementById("star-rating").value;
    let Description = document.getElementById("description").value;
    let elderCheck = document.querySelector('#elderlyCheck').checked;
    let accessibleCheck = document.querySelector('#accessibleCheck').checked;
    let pregnantCheck = document.querySelector('#pregnantCheck').checked;
    let childCheck = document.querySelector('#childCheck').checked;
    let transgenderCheck = document.querySelector('#transgenderCheck').checked;
    //console.log(Title, Location, Description, elderCheck, accessibleCheck, pregnantCheck, childCheck, transgenderCheck);


    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("Users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    
                    // var userEmail = userDoc.data().email;
                    db.collection("Potties").add({
                        userID: userID,
                        title: Title,
                        // location: Location,
                        ratings: Ratings,
                        description: Description,
                        elderly_accessible: elderCheck,
                        wheelchair_accessible: accessibleCheck,
                        pregnant_accessible: pregnantCheck,
                        diaper_station: childCheck,
                        LGBT_accessible: transgenderCheck

                    }).then((doc)=>{
                        currentUser
                        .set(
                          {
                            bookmarks: firebase.firestore.FieldValue.arrayUnion(doc.id),
                          },
                          {
                            merge: true,
                          }
                        )
                        // window.location.href = "potties.html";
                    })
                })
        } else {
            // No user is signed in.
        }
    });

}