function searchProduct() {

    const searchInput = document.getElementById('filter').value.toUpperCase();
    const cardContainer = document.getElementById('Potties-go-here');

    const cards = cardContainer.getElementsByClassName('card');

    for(let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector(".card-body h3.card-title");

        if(title.innerText.toUpperCase().indexOf(searchInput) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}