// Dynamic base path for GitHub Pages or local use
const base = window.location.hostname.includes("github.io")
    ? "/CSE499-Senior-Project"
    : "";

document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;

    // Get existing users or empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    if (users.find(u => u.username === username)) {
        alert("Username already taken!");
        return;
    }

    // Add new user
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created! Please log in.");
    window.location.href = `${base}/login/login.html`; // redirect to login
});
