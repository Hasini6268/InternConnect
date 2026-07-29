const API_URL = "http://localhost:5000/api";

const token = localStorage.getItem("token");


// Check login
if (!token) {
    window.location.href = "login.html";
}


// Logout
function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
}



// Common headers
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
};



// Load Dashboard
async function loadDashboard() {

    try {


        // =========================
        // Dashboard Statistics
        // =========================

        const dashboardRes = await fetch(
            `${API_URL}/admin/dashboard`,
            {
                headers
            }
        );


        const dashboardData = await dashboardRes.json();


        console.log("Dashboard:", dashboardData);



        if (dashboardData.success) {


            const d = dashboardData.dashboard;


            document.getElementById("stats").innerHTML = `

                <p>
                <strong>Total Students:</strong>
                ${d.totalStudents || 0}
                </p>


                <p>
                <strong>Total Companies:</strong>
                ${d.totalCompanies || 0}
                </p>


                <p>
                <strong>Total Internships:</strong>
                ${d.totalInternships || 0}
                </p>


                <p>
                <strong>Total Applications:</strong>
                ${d.totalApplications || 0}
                </p>

            `;


        }
        else {


            document.getElementById("stats").innerHTML =
            "Unable to load statistics";


        }





        // =========================
        // Students
        // =========================


        const studentsRes = await fetch(
            `${API_URL}/admin/students`,
            {
                headers
            }
        );


        const studentsData = await studentsRes.json();


        console.log("Students:", studentsData);



        let studentsHTML = "";


        if(studentsData.students && studentsData.students.length > 0){


            studentsData.students.forEach(student => {


                studentsHTML += `

                <div class="internship-card">

                    <h3>
                    ${student.fullName}
                    </h3>

                    <p>
                    ${student.email}
                    </p>


                    <button onclick="deleteUser('${student._id}')">
                    Delete
                    </button>


                </div>

                `;


            });


        }
        else {


            studentsHTML =
            "<p>No students found</p>";


        }



        document.getElementById(
            "studentsContainer"
        ).innerHTML = studentsHTML;








        // =========================
        // Companies
        // =========================


        const companiesRes = await fetch(
            `${API_URL}/admin/companies`,
            {
                headers
            }
        );


        const companiesData = await companiesRes.json();


        console.log("Companies:", companiesData);



        let companiesHTML = "";



        if(companiesData.companies &&
           companiesData.companies.length > 0){



            companiesData.companies.forEach(company => {



                companiesHTML += `

                <div class="internship-card">


                    <h3>
                    ${company.companyName || company.fullName}
                    </h3>


                    <p>
                    ${company.email}
                    </p>



                    <button onclick="deleteUser('${company._id}')">
                    Delete
                    </button>



                </div>

                `;


            });



        }
        else {


            companiesHTML =
            "<p>No companies found</p>";

        }



        document.getElementById(
            "companiesContainer"
        ).innerHTML = companiesHTML;









        // =========================
        // Internships
        // =========================



        const internshipRes = await fetch(
            `${API_URL}/admin/internships`,
            {
                headers
            }
        );


        const internshipData = await internshipRes.json();


        console.log("Internships:", internshipData);



        let internshipsHTML = "";



        if(internshipData.internships &&
           internshipData.internships.length > 0){



            internshipData.internships.forEach(internship => {



                internshipsHTML += `


                <div class="internship-card">


                    <h3>
                    ${internship.title}
                    </h3>


                    <p>
                    ${internship.companyName || "Company"}
                    </p>



                    <button onclick="deleteInternship('${internship._id}')">
                    Delete
                    </button>


                </div>



                `;



            });



        }
        else {


            internshipsHTML =
            "<p>No internships found</p>";


        }



        document.getElementById(
            "internshipsContainer"
        ).innerHTML = internshipsHTML;



    }


    catch(error){


        console.log(
            "Dashboard Error:",
            error
        );


        document.getElementById("stats").innerHTML =
        "Server connection error";


    }



}






// Delete User

async function deleteUser(id){


    if(!confirm("Delete this user?"))
        return;



    await fetch(
        `${API_URL}/admin/user/${id}`,
        {

            method:"DELETE",

            headers

        }
    );



    loadDashboard();


}






// Delete Internship

async function deleteInternship(id){


    if(!confirm("Delete this internship?"))
        return;



    await fetch(
        `${API_URL}/admin/internship/${id}`,
        {

            method:"DELETE",

            headers

        }
    );



    loadDashboard();


}






// Start dashboard

loadDashboard();