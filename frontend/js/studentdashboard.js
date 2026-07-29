console.log("Student Dashboard JS Loaded");


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


    if (nameElement) {

        nameElement.textContent =
        user.fullName;

    }

}



// ==========================
// Logout
// ==========================

function logout() {


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    window.location.href =
    "login.html";


}




// ==========================
// Load Dashboard Data
// ==========================

async function loadDashboard() {


    try {



        // Total Internships

        const internshipResponse =
        await fetch(

            `${API_URL}/internships`

        );



        const internshipData =
        await internshipResponse.json();



        if (internshipData.success) {


            document.getElementById(
                "internshipCount"
            ).textContent =

            internshipData.totalInternships ||
            internshipData.count ||
            internshipData.internships?.length ||
            0;


        }




        // Student Applications


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




        if (

            applicationResponse.status === 401 ||
            applicationResponse.status === 403

        ) {


            alert(
                "Session expired. Please login again."
            );


            logout();


            return;


        }




        if(applicationData.success){



            const applications =
            applicationData.applications || [];




            document.getElementById(
                "applicationCount"
            ).textContent =

            applications.length;




            const shortlisted =
            applications.filter(

                app =>
                app.status === "Shortlisted"

            );



            document.getElementById(
                "shortlistedCount"
            ).textContent =

            shortlisted.length;



        }



    }


    catch(error){



        console.error(
            "Dashboard Error:",
            error
        );



        if(
            document.getElementById("internshipCount")
        )
        document.getElementById(
            "internshipCount"
        ).textContent = 0;



        if(
            document.getElementById("applicationCount")
        )
        document.getElementById(
            "applicationCount"
        ).textContent = 0;



        if(
            document.getElementById("shortlistedCount")
        )
        document.getElementById(
            "shortlistedCount"
        ).textContent = 0;



    }


}




// ==========================
// Start Dashboard
// ==========================

loadDashboard();