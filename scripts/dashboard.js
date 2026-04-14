document.addEventListener("DOMContentLoaded", () => {

    const user = localStorage.getItem("loggedInUser");
    const storageKey = `transactions_${user}`;

    const transactions = JSON.parse(localStorage.getItem(storageKey)) || [];

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(item => {
        const amount = parseFloat(item.amount);

        if (item.category.toLowerCase() === "income") {
            totalIncome += amount;
        } else {
            totalExpenses += amount;
        }
    });

    document.getElementById("incomeAmount").textContent = "$" + totalIncome.toFixed(2);
    document.getElementById("expenseAmount").textContent = "$" + totalExpenses.toFixed(2);
    document.getElementById("balanceAmount").textContent = "$" + (totalIncome - totalExpenses).toFixed(2);

});
