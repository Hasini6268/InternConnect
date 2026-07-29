console.log("Company Dashboard JS Loaded");


const API_URL = "https://internconnect-ngxa.onrender.com/api";


const token = localStorage.getItem("token");


// ==========================
// Check Login
// ==========================

if (!token) {

    alert("Please login first");

    window.location.href = "login.html";

}



// ==========================
// Logout
// ==========================

function logout() {


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    window.location.href = "login.html";


}



// ==========================
// Load Company Internships
// ==========================

async function loadInternships() {


    try {


        const response = await fetch(

            `${API_URL}/internships/my/internships`,

            {

                headers: {

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );



        const data =
        await response.json();



        const container =
        document.getElementById(
            "internshipContainer"
        );



        if (!container) return;



        container.innerHTML = "";



        if (!response.ok) {


            container.innerHTML =
            `<h3>${data.message || "Unable to load internships"}</h3>`;

            return;

        }




        if (
            !data.internships ||
            data.internships.length === 0
        ) {


            container.innerHTML =
            "<h3>No internships posted yet.</h3>";

            return;


        }




        data.internships.forEach((internship)=>{


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
                ${internship.companyName || "Company"}
                </p>


                <p>
                ${internship.description}
                </p>


                <p>
                <strong>Location:</strong>
                ${internship.location}
                </p>


                <p>
                <strong>Duration:</strong>
                ${internship.duration}
                </p>


                <p>
                <strong>Mode:</strong>
                ${internship.mode}
                </p>


                <p>
                <strong>Stipend:</strong>
                ${internship.stipend}
                </p>



                <button onclick="viewApplicants('${internship._id}')">

                    View Applicants

                </button>



                <button onclick="deleteInternship('${internship._id}')">

                    Delete

                </button>


            `;



            container.appendChild(card);



        });



    }


    catch(error){


        console.error(
            "Load Internship Error:",
            error
        );


        alert(
            "Unable to connect server"
        );


    }



}




// ==========================
// Post Internship
// ==========================


const internshipForm =
document.getElementById(
    "internshipForm"
);



if(internshipForm){


internshipForm.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();



    const internship = {


        title:
        document.getElementById("title").value,



        description:
        document.getElementById("description").value,



        skills:
        document.getElementById("skills")
        .value
        .split(","),



        location:
        document.getElementById("location").value,



        duration:
        document.getElementById("duration").value,



        stipend:
        document.getElementById("stipend").value,



        mode:
        document.getElementById("mode").value,



        lastDate:
        document.getElementById("lastDate").value


    };



    try{


        const response =
       