console.log("Apply JS Loaded");


// Render Backend URL
const API_URL = "https://internconnect-ngxa.onrender.com/api";


const token = localStorage.getItem("token");



// Get internship ID from URL

const params = new URLSearchParams(
    window.location.search
);


const internshipId = params.get("id");



const form =
document.getElementById(
    "applicationForm"
);




// ==========================
// Check Login
// ==========================

if(!token){

    alert("Please login first");

    window.location.href =
    "login.html";

}




// ==========================
// Submit Application
// ==========================

form.addEventListener(
"submit",

async(e)=>{


    e.preventDefault();



    const phone =
    document.getElementById("phone").value;



    const college =
    document.getElementById("college").value;



    const skills =
    document.getElementById("skills").value;



    const coverLetter =
    document.getElementById("coverLetter").value;



    const resume =
    document.getElementById("resume").files[0];




    if(!internshipId){

        alert(
            "Invalid Internship"
        );

        return;

    }




    const formData =
    new FormData();



    formData.append(
        "internshipId",
        internshipId
    );


    formData.append(
        "phone",
        phone
    );


    formData.append(
        "college",
        college
    );


    formData.append(
        "skills",
        skills
    );


    formData.append(
        "coverLetter",
        coverLetter
    );


    formData.append(
        "resume",
        resume
    );





    try{


        const response =
        await fetch(

            `${API_URL}/applications/apply`,

            {

                method:"POST",

                headers:{

                    Authorization:
                    `Bearer ${token}`

                },

                body:
                formData

            }

        );




        const data =
        await response.json();



        console.log(
            "Application Response:",
            data
        );




        alert(
            data.message ||
            "Application submitted"
        );



        if(response.ok){


            window.location.href =
            "myapplications.html";


        }




    }


    catch(error){


        console.error(
            error
        );


        alert(
            "Server Error"
        );


    }



});