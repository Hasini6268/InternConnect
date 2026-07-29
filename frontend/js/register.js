const API_URL = "https://internconnect-ngxa.onrender.com/api";


const registerForm = document.getElementById("registerForm");


registerForm.addEventListener("submit", async (e)=>{

    e.preventDefault();


    const fullName =
    document.getElementById("fullName").value.trim();


    const email =
    document.getElementById("email").value.trim();


    const password =
    document.getElementById("password").value.trim();


    const role =
    document.getElementById("role").value;



    try{


        const response = await fetch(
            `${API_URL}/auth/register`,
            {

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

            }
        );



        const data = await response.json();



        if(response.ok){


            showToast(
                "Registration successful 🎉",
                "success"
            );


            setTimeout(()=>{

                window.location.href="login.html";

            },1500);


        }
        else{


            showToast(
                data.message || "Registration failed",
                "error"
            );


        }



    }
    catch(error){


        console.error(
            "Register Error:",
            error
        );


        showToast(
            "Unable to connect server",
            "error"
        );


    }


});