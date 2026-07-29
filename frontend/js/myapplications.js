console.log("My Applications JS Loaded");


// Render Backend URL
const API_URL = "https://internconnect-ngxa.onrender.com/api";


const token = localStorage.getItem("token");


// Check login
if (!token) {

    alert("Please login first");

    window.location.href = "login.html";

}



const container =
document.getElementById("applicationsContainer");



// ==========================
// Load My Applications
// ==========================

async function loadApplications(){


    try{


        const response = await fetch(

            `${API_URL}/applications/my-applications`,

            {

                method:"GET",

                headers:{

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );



        const data =
        await response.json();



        console.log(
            "My Applications:",
            data
        );



        container.innerHTML = "";



        if(!response.ok){


            container.innerHTML =
            `<h3>${data.message || "Unable to load applications"}</h3>`;

            return;

        }




        const applications =
        data.applications || [];




        if(applications.length === 0){


            container.innerHTML =
            "<h3>No applications submitted yet.</h3>";

            return;


        }




        applications.forEach(application=>{


            const internship =
            application.internship;



            const card =
            document.createElement("div");



            card.className =
            "internship-card";



            card.innerHTML = `


                <h2>
                    ${internship.title}
                </h2>


                <p>
                    <strong>Company:</strong>
                    ${internship.companyName || "N/A"}
                </p>


                <p>
                    <strong>Location:</strong>
                    ${internship.location || "N/A"}
                </p>


                <p>
                    <strong>Status:</strong>
                    ${application.status}
                </p>


                <p>
                    <strong>Applied On:</strong>
                    ${new Date(application.createdAt).toLocaleDateString()}
                </p>


            `;



            container.appendChild(card);



        });



    }


    catch(error){


        console.error(
            "Applications Error:",
            error
        );


        container.innerHTML =
        "<h3>Server connection error</h3>";


    }



}



// Start

loadApplications();