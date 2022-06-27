//--------------------------------------------------------
// Loads the navbar and footer if the container is found
//--------------------------------------------------------
function loadSkeleton() {
  $("#navbarPlaceholder").load("./template/navbar.html");
  $("#footerPlaceholder").load("./template/footer.html");
}
loadSkeleton(); //invoke the function