const form = document.getElementById("transaction-form");
const tableBody = document.getElementById("transaction-table-body");

function updateTotal() {
  let total = 0;

  // Loop through all rows in the table body
  document.querySelectorAll("#transaction-table-body tr").forEach((row) => {
    const amountCell = row.children[2]; // 3rd column
    const amountValue = parseFloat(amountCell.textContent.replace("$", ""));
    total += amountValue;
  });

  // Update the total in the footer
  document.getElementById("total-amount").textContent = `$${total.toFixed(2)}`;
}


// Count Transations
function updateTransactionCounter() {
  const rowCount = document.querySelectorAll(
    "#transaction-table-body tr",
  ).length;
  document.getElementById("transaction-counter").textContent = rowCount;
}

//Saving Transactions to Local storage
function saveTransactions() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) return;

  const rows = document.querySelectorAll("#transaction-table-body tr");
  const transactions = [];

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    transactions.push({
      date: cells[0].textContent,
      description: cells[1].textContent,
      amount: cells[2].textContent.replace("$", ""),
      category: cells[3].textContent
    });
  });

  localStorage.setItem(`transactions_${loggedInUser}`, JSON.stringify(transactions));
}

//Load trasaction table
function loadTransactions() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) return;

  const saved = JSON.parse(localStorage.getItem(`transactions_${loggedInUser}`)) || [];

  saved.forEach(t => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${t.date}</td>
      <td>${t.description}</td>
      <td>$${Number(t.amount).toFixed(2)}</td>
      <td>${t.category}</td>
      <td><img src="update-icon.png" alt="Update" width="20"></td>
      <td>
          <svg class="delete-btn" width="20" height="20" viewBox="0 0 24 24">
              <path fill="red" d="M3 6h18v2H3zm2 3h14l-1.5 12h-11zM9 4h6v2H9z"/>
          </svg>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

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

  //Save to Local Storage
  saveTransactions();

  // Update total
  updateTotal();
  updateTransactionCounter();

  // Clear the form
  form.reset();
});

//Delete Transaciton
tableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const row = event.target.closest("tr");
    row.remove();
    updateTotal();
    // Recalculate after deletion
    saveTransactions();
  }
});

//update total on page load.
document.addEventListener("DOMContentLoaded", () => {
  loadTransactions();
  updateTotal();
  updateTransactionCounter();
});



