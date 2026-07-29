console.log("Student Dashboard JS Loaded");


// Render Backend URL
const API_URL = "https://internconnect-ngxa.onrender.com/api";


const token = localStorage.getItem("token");

const user = JSON.parse(
    localStorage.getItem("user")
);



// ==========================
// Check Login
// ==========================

if (!token) {

    window.location.href = "login.html";

}




// ==========================
// Display Student Name
// ==========================

if (user) {


    const nameElement =
    document.getElementById("studentName");


    if(nameElement){

        nameElement.textContent =
        user.fullName;

    }


}





// ==========================
// Logout
// ==========================

function logout(){


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    window.location.href =
    "login.html";


}





// ==========================
// Load Dashboard Data
// ==========================

async function loadDashboard(){



    try {



        // ==========================
        // Load Internships Count
        // ==========================


        const internshipResponse =
        await fetch(
            `${API_URL}/internships`
        );



        const internshipData =
        await internshipResponse.json();



        console.log(
            "Internships:",
            internshipData
        );




        if(internshipResponse.ok){


            document.getElementById(
                "internshipCount"
            ).textContent =

            internshipData.internships
            ? internshipData.internships.length
            : internshipData.count || 0;



        }





        // ==========================
        // Load Applications
        // ==========================


        const applicationResponse =
        await fetch(

            `${API_URL}/applications/my-applications`,

            {

                method:"GET",

                headers:{


                    "Authorization":
                    `Bearer ${token}`,


                    "Content-Type":
                    "application/json"


                }

            }

        );



        const applicationData =
        await applicationResponse.json();



        console.log(
            "Applications:",
            applicationData
        );





        // Token expired

        if(
            applicationResponse.status === 401 ||
            applicationResponse.status === 403
        ){


            alert(
                "Session expired. Login again"
            );


            logout();

            return;


        }





        if(applicationResponse.ok){



            const applications =
            applicationData.applications || [];




            // Total Applications

            const applicationCount =
            document.getElementById(
                "applicationCount"
            );


            if(applicationCount){

                applicationCount.textContent =
                applications.length;

            }





            // Shortlisted Applications


            const shortlisted =
            applications.filter(

                app =>
                app.status === "Shortlisted"

            );



            const shortlistedCount =
            document.getElementById(
                "shortlistedCount"
            );



            if(shortlistedCount){


                shortlistedCount.textContent =
                shortlisted.length;


            }



        }




    }

    catch(error){


        console.error(
            "Dashboard Error:",
            error
        );



        document.getElementById(
            "internshipCount"
        ).textContent = 0;



        document.getElementById(
            "applicationCount"
        ).textContent = 0;



        document.getElementById(
            "shortlistedCount"
        ).textContent = 0;



    }


}





// ==========================
// Start Dashboard
// ==========================

loadDashboard();