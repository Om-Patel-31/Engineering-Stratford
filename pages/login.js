// document.addEventListener("DOMContentLoaded", () => {
//     const loginForm = document.getElementById("loginForm");
//     const messageElement = document.getElementById("message");

//     // Password to validate
//     const validPassword = "EngStratford@2024";

//     // Track the number of attempts
//     let attemptsLeft = 3;

//     // Handle form submission
//     loginForm.addEventListener("submit", (event) => {
//         event.preventDefault(); // Prevent default form submission

//         // Get the entered username and password
//         const usernameInput = document.getElementById("username").value;
//         const passwordInput = document.getElementById("password").value;

//         // Validate the username
//         if (!usernameInput.endsWith("@ed.amdsb.ca")) {
//             messageElement.textContent = "Invalid username. It must end with '@ed.amdsb.ca'.";
//             messageElement.className = "error";
//             return;
//         }

//         // Validate the password
//         if (passwordInput === validPassword) {
//             messageElement.textContent = "Login successful!";
//             messageElement.className = "success";

//             // Save login status in sessionStorage
//             sessionStorage.setItem("loggedIn", "true");

//             // Redirect to the home page
//             window.location.href = "home.html";
//         } else {
//             attemptsLeft--;

//             if (attemptsLeft > 0) {
//                 messageElement.textContent = `Invalid password. You have ${attemptsLeft} attempt(s) left.`;
//                 messageElement.className = "error";
//             } else {
//                 messageElement.textContent = "Too many failed attempts. Access locked.";
//                 messageElement.className = "error";

//                 // Disable the form
//                 loginForm.querySelector("button").disabled = true;
//             }
//         }
//     });

//     // Check login status when accessing other pages
//     if (!sessionStorage.getItem("loggedIn")) {
//         const currentPage = window.location.pathname.split("/").pop();
//         if (currentPage !== "login.html") {
//             alert("You must sign in first!");
//             window.location.href = "login.html";
//         } else {
//             // Allow access to the login page
//             window.location.href = "login.html";
//         }
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    // Check the current page
    const currentPage = window.location.pathname.split("/").pop();

    // Redirect to login.html if not already on it
    if (currentPage === "" || currentPage === "index.html") {
        window.location.href = "login.html";
    }

    const loginForm = document.getElementById("loginForm");
    const messageElement = document.getElementById("message");

    // Password to validate
    const validPassword = "EngStratford@2024";

    // Track the number of attempts
    let attemptsLeft = 3;

    if (loginForm) {
        // Handle form submission
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent default form submission

            // Get the entered username and password
            const usernameInput = document.getElementById("username").value;
            const passwordInput = document.getElementById("password").value;

            // Validate the username
            if (!usernameInput.endsWith("@ed.amdsb.ca")) {
                messageElement.textContent =
                    "Invalid username. It must end with '@ed.amdsb.ca'.";
                messageElement.className = "error";
                return;
            }

            // Validate the password
            if (passwordInput === validPassword) {
                messageElement.textContent = "Login successful!";
                messageElement.className = "success";

                // Save login status in sessionStorage
                sessionStorage.setItem("loggedIn", "true");

                // Redirect to the home page
                window.location.href = "home.html";
            } else {
                attemptsLeft--;

                if (attemptsLeft > 0) {
                    messageElement.textContent = `Invalid password. You have ${attemptsLeft} attempt(s) left.`;
                    messageElement.className = "error";
                } else {
                    messageElement.textContent =
                        "Too many failed attempts. Access locked.";
                    messageElement.className = "error";

                    // Disable the form
                    loginForm.querySelector("button").disabled = true;
                }
            }
        });
    }

    // Check login status when accessing other pages
    if (!sessionStorage.getItem("loggedIn")) {
        const currentPage = window.location.pathname.split("/").pop();
        if (currentPage !== "login.html") {
            alert("You must sign in first!");
            window.location.href = "login.html";
        }
    }
});