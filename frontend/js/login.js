const API_URL = "http://localhost:5000/api";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();


    try {

        const response = await fetch(`${API_URL}/auth/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });


        const data = await response.json();


        if (response.ok) {

            // Save login details
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));


            // Role based dashboard redirect

            if (data.user.role === "admin") {

                window.location.href = "admindashboard.html";

            } 
            else if (data.user.role === "company") {

                window.location.href = "companydashboard.html";

            } 
            else {

                window.location.href = "studentdashboard.html";

            }


        } else {

            alert(data.message || "Login failed");

        }


    } catch (error) {

        console.error("Login Error:", error);

        alert("Server error. Please try again.");

    }

});