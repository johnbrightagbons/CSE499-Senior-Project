// Function to handle search bar input and display results
function startSearch() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase(); // Get the search input and convert to lowercase for case-insensitive search
  const searchButton = document.getElementById("searchButton"); // Get the search button element

  if (searchInput.trimed || !searchButton) {
    setTimeout(startSearch, 200); // If the search input is empty or the search button is not found, wait for 200 milliseconds and try again{
    alert("Please enter a valid word."); // Alert the user to enter a search term
    return;
  }

  // Add event listener to the search button to trigger the search when clicked
  searchInput.addeventListener("input", doSearch);
  searchButton.addEventListener("click", doSearch);
}

// Function to perform the search and display results
function doSearch() {
  const tableBody = document.getElementById("transactionTableBody"); // Get the table body element where search results will be displayed

  if (!tableBody) {
    return; // If the table body is not found, exit the function
  }

  // Get all rows in the table body and filter them based on the search input
  const rows = tableBody.getElementsByTagName("tr");

  // Loop through each row and check if it matches the search input
  for (let s = 0; s < rows.length; s++) {
    const row = rows[s];
    const cells = row.getElementsByTagName("td");

    if (cells.length > 3) {
      const description = cells[3].textContent.toLowerCase(); // Get the description cell and convert to lowercase
      const category = cells[2].textContent.toLowerCase(); // Get the category cell and convert to lowercase

      if (description.includes(searchInput) || category.includes(searchInput)) {
        row.style.display = ""; // If the description or category includes the search input, show the row
      } else {
        row.style.display = "none"; // Otherwise, hide the row
      }
    }
  }
}

// Start the search functionality when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", startSearch);

// Also start the search functionality when the search button is clicked
document.getElementById("searchButton").addEventListener("click", startSearch);

// Also start when the header might load dynamically
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  if (searchButton) {
    searchButton.addEventListener("click", startSearch);
  }
});
