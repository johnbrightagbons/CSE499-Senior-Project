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

let budgetChart = null;

function updatePieChart() {
  const rows = document.querySelectorAll("#transaction-table-body tr");
  const categoryTotals = {};

  rows.forEach((row) => {
    const amount = parseFloat(row.children[2].textContent.replace("$", ""));
    const category = row.children[3].textContent;

    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  // Generate consistent random colors
  const colors = labels.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`);

  const ctx = document.getElementById("budgetChart").getContext("2d");

  if (budgetChart) {
    budgetChart.destroy();
  }

  budgetChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      responsive: false,
    },
  });
}

// Count Transations
function updateTransactionCounter() {
  const rowCount = document.querySelectorAll(
    "#transaction-table-body tr",
  ).length;
  document.getElementById("transaction-counter").textContent = rowCount;
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

  // Update total
  updateTotal();
  updatePieChart();
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
    updatePieChart(); // Recalculate after deletion
  }
});

//update total on page load.
document.addEventListener("DOMContentLoaded", () => {
  updateTotal();
  updatePieChart();
  updateTransactionCounter();
});
