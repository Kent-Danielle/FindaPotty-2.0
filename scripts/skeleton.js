//--------------------------------------------------------
// Loads the navbar and footer if the container is found
//--------------------------------------------------------
function loadSkeleton() {
  console.log($("#navbarPlaceholder").load("./template/navbar.html"));
  console.log($("#footerPlaceholder").load("./template/footer.html"));
}
loadSkeleton(); //invoke the function