// Function to load the hamburger menu
function loadHamburgerMenu() {
  const hamburger = document.getElementById("hamburgerMenu"); // Get the humburger element ID
  const navLinks = document.querySelector(".navLinks"); // Get the nav links
  if (!hamburger || !navLinks) return; // Open when both elements are present
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active"); // Toggle the active class on the hamburger menu
    navLinks.classList.toggle("mobile-active"); // Toggle the mobile-active class on the nav links
  });

  // Close menu when a navigation link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active"); // Remove active classes to close the menu
      navLinks.classList.remove("mobile-active");
    });
  });

  // Hamburger Menu is automatically closed on large screen
  window.addEventListener("resize", function () {
    const hamburger = document.getElementById("hamburgerMenu");
    const navLinks = document.querySelector(".navLinks");

    if (!hamburger || !navLinks) return; // Ensure elements exist before proceeding

    if (window.innerWidth > 768) {
      hamburger.classList.remove("active"); // Remove active classes to close the menu
      navLinks.classList.remove("mobile-active");
    }
  });
}

// Function to load header and footer
function loadComponents(elementid, filepath) {
  // Load header and footer from external HTML files
  fetch(filepath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementid).innerHTML = data;

      // If this is the header, initialize the hamburger menu
      if (elementid === "header") {
        loadHamburgerMenu();
      }
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
toggleModeScript.src = "../scripts/toggleMode.js";
document.head.appendChild(toggleModeScript);

// Load search.js in search page
const currentPage = window.location.pathname;
if (currentPage.includes("budget")) {
  const searchScript = document.createElement("script");
  searchScript.src = "../scripts/search.js";
  document.head.appendChild(searchScript);
}
