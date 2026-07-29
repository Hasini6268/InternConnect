console.log("Login JS Loaded");


const API_URL = "https://internconnect-ngxa.onrender.com/api";


const loginForm = document.getElementById("loginForm");


if (loginForm) {


loginForm.addEventListener("submit", async (e) => {


    e.preventDefault();



    const email =
    document.getElementById("email").value.trim();



    const password =
    document.getElementById("password").value.trim();



    try {



        const response = await fetch(

            `${API_URL}/auth/login`,

            {

                method: "POST",


                headers: {

                    "Content-Type": "application/json"

                },


                body: JSON.stringify({

                    email,

                    password

                })


            }

        );



        const data = await response.json();



        console.log("Login Response:", data);




        if (response.ok) {



            // Save user details

            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );




            alert("Login successful 🎉");




            // Redirect based on role

            if (data.user.role === "admin") {


                window.location.href =
                "admindashboard.html";


            }


            else if (data.user.role === "company") {


                window.location.href =
                "companydashboard.html";


            }


            else {


                window.location.href =
                "studentdashboard.html";


            }



        }


        else {


            alert(
                data.message ||
                "Invalid login details"
            );


        }




    }


    catch(error) {



        console.error(
            "Login Error:",
            error
        );



        alert(
            "Server error. Please try again"
        );



    }



});


}