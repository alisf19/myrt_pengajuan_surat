const express = require('express');
const path = require('path');
const koneksi = require('./database'); // Import koneksi database

const app = express();
const port = 3000;

// Middleware untuk melayani file statis (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

// Handle form submission
// Handle form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get form values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.querySelector('input[name="role"]:checked').value;

    // Dummy authentication (replace with actual authentication logic)
    if (username === "rtuser" && password === "rt123" && role === "RT") {
        // Redirect to RT dashboard
        window.location.href = "rt_dashboard.html";
    } else if (username === "wargauser" && password === "warga123" && role === "Warga") {
        // Redirect to Warga dashboard
        window.location.href = "warga_dashboard.html";
    } else {
        // Display error message if authentication fails
        alert("Username, password, atau peran salah. Silakan coba lagi.");
    }
});



// Get the login modal
const loginModal = document.getElementById('login-modal');

// Get the login link
const loginLink = document.getElementById('login-link');

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks on the login link, open the modal
loginLink.onclick = function() {
    loginModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    loginModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}
