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
  loadComponents("header", "../components/header.html");
  loadComponents("footer", "../components/footer.html");
});

// Load toggleMode.js in all page
const toggleModeScript = document.createElement("script");
toggleModeScript.src = "scripts/toggleMode.js";
document.head.appendChild(toggleModeScript);

// Load search.js in all pages
const searchScript = document.createElement("script");
searchScript.src = "scripts/search.js";
document.head.appendChild(searchScript);
