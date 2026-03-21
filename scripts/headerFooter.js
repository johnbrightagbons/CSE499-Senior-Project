// Function to load header and footer
function loadComponents(elementid, filepath) {
  // Load header and footer from external HTML files
  fetch(filepath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementid).innerHTML = data; // Insert the loaded HTML into the specified element
    })
    .catch((error) => console.error("Error loading header and footer:", error)); // Log any errors that occur during the loading process
}
document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer when the DOM is fully loaded
  loadComponents("header", "components/header.html");
  loadComponents("footer", "components/footer.html");
});
