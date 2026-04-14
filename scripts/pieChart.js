let budgetChart = null;

function formatCategory(cat) {
    cat = cat.toLowerCase();
    return cat.charAt(0).toUpperCase() + cat.slice(1);
}

function updatePieChart() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) return;

    // Load saved transactions
    const saved = JSON.parse(localStorage.getItem(`transactions_${loggedInUser}`)) || [];

    const categoryTotals = {};

    // Build totals from localStorage instead of DOM
    saved.forEach(t => {
        const amount = parseFloat(t.amount);
        const rawCategory = t.category.trim();
        const category = rawCategory.toLowerCase();

        categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    });

    const labels = Object.keys(categoryTotals).map(formatCategory);
    const data = Object.values(categoryTotals);

    // Generate consistent random colors
    const colors = labels.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`);

    const canvas = document.getElementById("budgetChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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


document.addEventListener("DOMContentLoaded", () => {
    updatePieChart();
});