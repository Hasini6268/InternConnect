console.log("Register JS Loaded");

const API_URL = "https://internconnect-ngxa.onrender.com/api";


const registerForm = document.getElementById("registerForm");


registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const fullName =
        document.getElementById("fullName").value.trim();


    const email =
        document.getElementById("email").value.trim();


    const password =
        document.getElementById("password").value.trim();


    const role =
        document.getElementById("role").value;



    try {


        const response = await fetch(
            `${API_URL}/auth/register`,
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },


                body: JSON.stringify({

                    fullName,
                    email,
                    password,
                    role

                })

            }
        );



        const data = await response.json();



        console.log("Register Response:", data);



        if(response.ok){


            alert("Registration successful 🎉");


            window.location.href = "login.html";


        }
        else{


            alert(
                data.message ||
                "Registration failed"
            );


        }



    }
    catch(error){


        console.error(
            "Register Error:",
            error
        );


        alert(
            "Cannot connect to server"
        );


    }


});