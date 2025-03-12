document.addEventListener("DOMContentLoaded", () => {
    // Check the current page
    const currentPage = window.location.pathname.split("/").pop();

    // Redirect to login.html if not already on it
    if (currentPage === "" || currentPage === "index.html") {
        window.location.href = "login.html";
    }

    const loginForm = document.getElementById("loginForm");
    const messageElement = document.getElementById("message");
    const profileSection = document.getElementById("profileSection");
    const profileEmail = document.getElementById("profileEmail");
    const profilePicture = document.getElementById("profilePicture");
    const captureButton = document.getElementById("captureButton");
    const retakeButton = document.getElementById("retakeButton");
    const confirmButton = document.getElementById("confirmButton");
    const videoElement = document.getElementById("videoElement");
    const canvasElement = document.getElementById("canvasElement");

    // Password to validate
    const validPassword = "EngineeringStratford";

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
                messageElement.style.color = "green";
                messageElement.textContent = "Login successful!";
                messageElement.className = "success";

                // Save login status and email in sessionStorage
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("email", usernameInput);

                // Redirect to the home page
                window.location.href = "home.html";
            } else {
                attemptsLeft--;

                if (attemptsLeft > 0) {
                    messageElement.style.color = "red";
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
    if (sessionStorage.getItem("loggedIn")) {
        const email = sessionStorage.getItem("email");
        profileEmail.textContent = email;
        profileSection.style.display = "block";

        // Initialize camera stream
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoElement.srcObject = stream;
                videoElement.style.display = "block";
            })
            .catch((err) => {
                console.error("Error accessing camera: ", err);
            });

        captureButton.addEventListener("click", () => {
            const context = canvasElement.getContext("2d");
            context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            profilePicture.src = canvasElement.toDataURL("image/png");
            profilePicture.style.display = "block";
            videoElement.style.display = "none";
            canvasElement.style.display = "none";
            confirmButton.style.display = "inline-block";
            retakeButton.style.display = "inline-block";
        });

        retakeButton.addEventListener("click", () => {
            profilePicture.style.display = "none";
            videoElement.style.display = "block";
            confirmButton.style.display = "none";
            retakeButton.style.display = "none";
        });

        confirmButton.addEventListener("click", () => {
            alert("Profile picture set successfully!");
            confirmButton.style.display = "none";
            retakeButton.style.display = "none";
        });
    } else {
        if (currentPage !== "login.html") {
            alert("You must sign in first!");
            window.location.href = "login.html";
        }
    }
});