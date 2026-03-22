window.onload = function() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
};

document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    const user = users.find(u => u.username === username && u.password === password);

    if(user){
        // Store currently logged-in user
        localStorage.setItem("loggedInUser", user.username);
        window.location.href = "../dashboard.html";
    }else{
        document.getElementById("message").innerText = "Invalid username or password.";
    }
});

// Simulated Google login with custom name
function googleLogin(){
    let displayName = prompt("Enter your Google display name:", "Google User");
    if(!displayName) displayName = "Google User"; // fallback if cancelled

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if(!users.find(u => u.username === displayName)) {
        users.push({ username: displayName, password: "" });
        localStorage.setItem("users", JSON.stringify(users));
    }
    localStorage.setItem("loggedInUser", displayName);
    alert("Logged in as " + displayName);
    window.location.href = "../dashboard.html";
}

// Simulated Apple login with custom name
function appleLogin(){
    let displayName = prompt("Enter your Apple display name:", "Apple User");
    if(!displayName) displayName = "Apple User"; // fallback if cancelled

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if(!users.find(u => u.username === displayName)) {
        users.push({ username: displayName, password: "" });
        localStorage.setItem("users", JSON.stringify(users));
    }
    localStorage.setItem("loggedInUser", displayName);
    alert("Logged in as " + displayName);
    window.location.href = "../dashboard.html";
}