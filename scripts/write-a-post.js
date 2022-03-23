function writePost() {
    console.log("in")
    let Title = document.getElementById("inputTitle").value;
    let Location = document.getElementById("location").value;
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
                    db.collection("Posts").add({
                        userID: userID,
                        title: Title,
                        // location: Location,
                        description: Description,
                        elderly: elderCheck,
                        accessible: accessibleCheck,
                        pregnant: pregnantCheck,
                        child: childCheck,
                        transgender: transgenderCheck

                    }).then(()=>{
                        //window.location.href = "thanks.html";
                    })
                })
                   
        } else {
            // No user is signed in.
        }
    });

}