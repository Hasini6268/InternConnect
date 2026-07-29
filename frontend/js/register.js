const API_URL = "http://localhost:5000/api";


const registerForm = document.getElementById("registerForm");


registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const fullName = document.getElementById("fullName").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    const role = document.getElementById("role").value;



    try {


        const response = await fetch(`${API_URL}/auth/register`, {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                fullName,
                email,
                password,
                role

            })

        });



        const data = await response.json();



        if(response.ok){


            showToast("Registration successful 🎉","success");


            setTimeout(()=>{

                window.location.href="login.html";

            },2000);


        }

        else{


            showToast(data.message || "Registration failed ❌","error");


        }



    }


    catch(error){


        console.log(error);


        showToast("Server error ❌","error");


    }


});