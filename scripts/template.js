//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadSkeleton() {
  console.log($("#navbarPlaceholder").load("./template/navbar.html"));
  console.log($("#footerPlaceholder").load("./template/footer.html"));
}
loadSkeleton(); //invoke the function
