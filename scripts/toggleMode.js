// Function to initialize dark mode toggle
function initializeModeToggle() {
  const modeToggle = document.getElementById("modeToggle"); // Get the toggle button element

  if (!modeToggle) {
    setTimeout(initializeModeToggle, 200); // If the toggle button is not found, wait for 200 milliseconds and try again
    return;
  }

  // Check if dark mode is enabled
  const isDarkMode = localStorage.getItem("darkMode") === "true"; // Check local storage for dark mode setting

  if (isDarkMode) {
    document.body.classList.add("dark-mode"); // If dark mode is enabled, add the dark-mode class to the body
    modeToggle.textContent = "☀️"; // Update the toggle button text to indicate the current mode
  } else {
    modeToggle.textContent = "🌙"; // If dark mode is not enabled, update the toggle button text to indicate the current mode
  }

  // Add event listener to the toggle button to switch between dark and light mode when clicked
  modeToggle.addEventListener("click", toggleDarkMode);
}

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body; // Get the body element
  const modeToggle = document.getElementById("modeToggle"); // Get the toggle button element

  // Toggle the dark-mode class on the body element
  body.classList.toggle("dark-mode");

  // Update the toggle button text based on the current mode
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);

  // Update button icon
  modeToggle.textContent = isDarkMode ? "☀️" : "🌙";
}

// Initialize mode toggle when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeModeToggle);

// Also try to initialize after header might be loaded dynamically
setTimeout(initializeModeToggle, 300);
