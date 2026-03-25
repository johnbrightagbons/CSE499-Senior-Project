const form = document.getElementById("transaction-form");
const tableBody = document.getElementById("transaction-table-body");

//Create Transaction
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh

    // Get values from the form
    const date = document.getElementById("date-input").value;
    const description = document.getElementById("description-input").value;
    const amount = document.getElementById("amount-input").value;
    const category = document.getElementById("category-input").value;

    // Create a new row
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${date}</td>
    <td>${description}</td>
    <td>$${Number(amount).toFixed(2)}</td>
    <td>${category}</td>
    <td><img src="update-icon.png" alt="Update" width="20"></td>
    <td>
        <svg class="delete-btn" width="20" height="20" viewBox="0 0 24 24">
            <path fill="red" d="M3 6h18v2H3zm2 3h14l-1.5 12h-11zM9 4h6v2H9z"/>
        </svg>
    </td>
  `;

    // Add the row to the table
    tableBody.appendChild(row);

    // Clear the form
    form.reset();
});

//Delete Transaciton
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const row = event.target.closest("tr");
        row.remove();
    }
});
