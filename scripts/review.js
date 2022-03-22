function addReviews() {
    let reviewGroup = document.getElementById("reviewGroup");
    let reviewTemplate = document.getElementById("reviewTemplate");

    db.collection("User").get()
        .then(allUsers => {
            allUsers.forEach(doc => {
                var name = doc.data().username; //gets the name field
                var date = doc.data().date; //gets the date field
                var description = doc.data().description; //gets the description field
                var rate = doc.data().rate; //gets the review field
                var features = "";
                let review = reviewTemplate.content.cloneNode(true);
                review.querySelector('.name').innerHTML = name;
                review.querySelector('.date').innerHTML = date;
                review.querySelector('.text').innerHTML = description;

                for (var i = 1; i <= rate; i++) {
                    features = features + "<i class='text-warning material-icons'><h6>star</h6></i>";
                }

                review.querySelector('.rating').innerHTML = features;
                reviewGroup.appendChild(review);
            })

        })
}
addReviews();