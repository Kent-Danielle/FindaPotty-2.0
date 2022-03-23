let potty = localStorage.getItem("postID");

db.collection("Posts").where("id", "==", potty)
    .get()
    .then(queryPost => {
        //see how many results you have got from the query
        size = queryPost.size;
        // get the documents of query
        Hikes = queryPost.docs;

        // We want to have one document per hike, so if the the result of 
        //the query is more than one, we can check it right now and clean the DB if needed.
        if (size = 1) {
            var thisPost = Posts[0].data();
            postName = thisPost.name;
            console.log(postName);
            document.getElementById("PostName").innerHTML = postName;
        } else {
            console.log("Query has more than one data")
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

function writeReview() {
    console.log("in")
    let Title = document.getElementById("inputTitle").value;
    let Description = document.getElementById("description").value;
    //console.log(Title, Location, Description, elderCheck, accessibleCheck, pregnantCheck, childCheck, transgenderCheck);


    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("Users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    
                    // var userEmail = userDoc.data().email;
                    db.collection("Reviews").add({
                        postID: potty,
                        userID: userID,
                        title: Title,
                        description: Description,

                    }).then(()=>{
                        //window.location.href = "thanks.html";
                    })
                })
                   
        } else {
            // No user is signed in.
        }
    });

}