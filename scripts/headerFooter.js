const base = window.location.hostname.includes("github.io")
  ? "/CSE499-Senior-Project"
  : "";
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
      const processedData = data.replaceAll("${base}", base);

      document.getElementById(elementid).innerHTML = processedData;

      // If this is the header, initialize the hamburger menu
      if (elementid === "header") {
        loadHamburgerMenu();
        updateNav(); // Update the navigation links base on the user's login state
      }
    })
    .catch((error) => console.error("Error loading header and footer:", error)); // Log any errors that occur during the loading process
}
document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer when the DOM is fully loaded
  loadComponents("header", `${base}/components/header.html`);
  loadComponents("footer", `${base}/components/footer.html`);
});

// Load toggleMode.js in all page
const toggleModeScript = document.createElement("script");
toggleModeScript.src = `${base}/scripts/toggleMode.js`;
document.head.appendChild(toggleModeScript);


function updateNav() {
    const user = localStorage.getItem("loggedInUser");

    const loginItem = document.getElementById("loginItem");
    const registerItem = document.getElementById("registerItem");
    const userMenu = document.getElementById("userMenu");
    const avatar = document.getElementById("avatar");
    const greeting = document.getElementById("userGreeting");

    if (user) {
        loginItem.style.display = "none";
        registerItem.style.display = "none";
        userMenu.style.display = "block";

        // avatar letter
        avatar.textContent = user.charAt(0).toUpperCase();

        // greeting text
        greeting.textContent = `Hello, ${user}`;

    } else {
        loginItem.style.display = "block";
        registerItem.style.display = "block";
        userMenu.style.display = "none";
    }
}


document.addEventListener("click", function (e) {
    const avatar = document.getElementById("avatar");
    const dropdown = document.getElementById("dropdownMenu");

    if (!avatar || !dropdown) return;

    if (avatar.contains(e.target)) {
        dropdown.classList.toggle("show");
    } else {
        dropdown.classList.remove("show");
    }
});

/* Commented out for Delete function to work
// Load search.js in search page
const currentPage = window.location.pathname;
if (currentPage.includes("budget")) {
  const searchScript = document.createElement("script");
  searchScript.src = `${base}/scripts/search.js`;
  document.head.appendChild(searchScript);
}
*/