window.onload = function () {

    const savedUser = localStorage.getItem("rememberedUser");

    if (savedUser) {
        // AUTO-FILL USERNAME
        document.getElementById("username").value = savedUser;

        // OPTIONAL: check remember me box
        const rememberMe = document.getElementById("rememberMe");
        if (rememberMe) {
            rememberMe.checked = true;
        }

    } else {
        // ONLY clear if nothing saved
        document.getElementById("username").value = "";
    }

    // ALWAYS clear password for security
    document.getElementById("password").value = "";
};

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const rememberMe = document.getElementById("rememberMe");
    const message = document.getElementById("message");

    // Check if user exists
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Store currently logged-in user
        localStorage.setItem("loggedInUser", user.username);


        // ⭐ REMEMBER ME FEATURE 
        if (rememberMe && rememberMe.checked) {
            localStorage.setItem("rememberedUser", username);
        } else {
            localStorage.removeItem("rememberedUser");
        }

        message.textContent = "Login successful!";
        message.style.color = "green";

        setTimeout(() => {
            window.location.href = `${base}/dashboard.html`;
        }, 1000);


    } 
    
    
    else {
        message.textContent = "Invalid login details";
        message.style.color = "red";

        // SHAKE EFFECT 
        document.getElementById("loginForm").classList.add("shake");

        setTimeout(() => {
            document.getElementById("loginForm").classList.remove("shake");
        }, 500);
    }
});

// Simulated Google login with custom name
function googleLogin() {
    let displayName = prompt("Enter your Google display name:", "Google User");
    if (!displayName) displayName = "Google User"; // fallback if cancelled

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.find(u => u.username === displayName)) {
        users.push({ username: displayName, password: "" });
        localStorage.setItem("users", JSON.stringify(users));
    }
    localStorage.setItem("loggedInUser", displayName);
    alert("Logged in as " + displayName);
    window.location.href = `${base}/dashboard.html`;
}

// Simulated Apple login with custom name
function appleLogin() {
    let displayName = prompt("Enter your Apple display name:", "Apple User");
    if (!displayName) displayName = "Apple User"; // fallback if cancelled

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.find(u => u.username === displayName)) {
        users.push({ username: displayName, password: "" });
        localStorage.setItem("users", JSON.stringify(users));
    }
    localStorage.setItem("loggedInUser", displayName);
    alert("Logged in as " + displayName);
    window.location.href = `${base}/dashboard.html`;
}