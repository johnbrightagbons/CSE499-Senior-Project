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
      <td>
  <div class="icon-btn update-btn">
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#1976d2" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  </div>
      </td>
      <td>
  <div class="icon-btn delete-btn">
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="red" d="M3 6h18v2H3zm2 3h14l-1.5 12h-11zM9 4h6v2H9z"/>
    </svg>
  </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

//Create Transaction
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const date = document.getElementById("date-input").value;
  const description = document.getElementById("description-input").value;
  const amount = document.getElementById("amount-input").value;
  const category = document.getElementById("category-input").value;

  const editIndex = document.getElementById("edit-index").value;

  // If editIndex has a value → UPDATE
  if (editIndex !== "") {
    const row = tableBody.children[editIndex];
    row.children[0].textContent = date;
    row.children[1].textContent = description;
    row.children[2].textContent = `$${Number(amount).toFixed(2)}`;
    row.children[3].textContent = category;

    // Reset edit mode
    document.getElementById("edit-index").value = "";
    form.querySelector("button[type='submit']").textContent = "Add Transaction";

  } else {
    // Otherwise → CREATE NEW ROW
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${date}</td>
      <td>${description}</td>
      <td>$${Number(amount).toFixed(2)}</td>
      <td>${category}</td>
      <td>
        <div class="icon-btn update-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#1976d2" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </div>
      </td>
      <td>
        <div class="icon-btn delete-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="red" d="M3 6h18v2H3zm2 3h14l-1.5 12h-11zM9 4h6v2H9z"/>
          </svg>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  }

  // Save + update UI
  saveTransactions();
  updateTotal();
  updateTransactionCounter();

  form.reset();
});


//Delete Transaciton
tableBody.addEventListener("click", (event) => {
  const btn = event.target.closest(".delete-btn");
  if (!btn) return;

  const row = btn.closest("tr");
  row.remove();

  updateTotal();
  saveTransactions();
  updateTransactionCounter();
});


//Update Transaction
tableBody.addEventListener("click", (event) => {
  const btn = event.target.closest(".update-btn");
  if (!btn) return;

  const row = btn.closest("tr");
  const cells = row.querySelectorAll("td");
  const index = Array.from(tableBody.children).indexOf(row);

  // Load values into form
  document.getElementById("date-input").value = cells[0].textContent;
  document.getElementById("description-input").value = cells[1].textContent;
  document.getElementById("amount-input").value = cells[2].textContent.replace("$", "");
  document.getElementById("category-input").value = cells[3].textContent;

  // Store index so submit knows we're editing
  document.getElementById("edit-index").value = index;

  // Change button text to indicate editing
  form.querySelector("button[type='submit']").textContent = "Update Transaction";
});


//update total on page load.
document.addEventListener("DOMContentLoaded", () => {
  loadTransactions();
  updateTotal();
  updateTransactionCounter();
});



