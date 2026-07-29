// InternConnect - internships.js

const API_URL = "http://localhost:5000/api";

const internshipContainer = document.getElementById("internshipContainer");

const applicationModal = document.getElementById("applicationModal");
const applicationForm = document.getElementById("applicationForm");



async function loadInternships() {

    try {

        const response = await fetch(`${API_URL}/internships`);

        const data = await response.json();


        if (!response.ok) {

            alert(data.message || "Failed to load internships");
            return;

        }


        internshipContainer.innerHTML = "";


        data.internships.forEach((internship) => {


            const card = document.createElement("div");

            card.classList.add("internship-card");


            card.innerHTML = `

                <h2>${internship.title}</h2>


                <p>
                    <strong>Company:</strong>
                    ${internship.companyName || "Not specified"}
                </p>


                <p>
                    <strong>Description:</strong>
                    ${internship.description}
                </p>


                <p>
                    <strong>Skills:</strong>
                    ${internship.skills.join(", ")}
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
                    <strong>Stipend:</strong>
                    ${internship.stipend}
                </p>


                <p>
                    <strong>Mode:</strong>
                    ${internship.mode}
                </p>


                <p>
                    <strong>Last Date:</strong>
                    ${new Date(internship.lastDate).toDateString()}
                </p>


                <button onclick="openApplicationForm('${internship._id}')">
                    Apply Now
                </button>

            `;


            internshipContainer.appendChild(card);


        });


    } catch(error) {

        console.error(error);

        alert("Cannot connect to server");

    }

}




// Open Application Form

function openApplicationForm(id) {

    applicationModal.style.display = "block";

    document.getElementById("internshipId").value = id;

}




// Close Application Form

function closeApplicationForm() {

    applicationModal.style.display = "none";

    applicationForm.reset();

}





// Submit Application

applicationForm.addEventListener("submit", async (e)=>{


    e.preventDefault();


    const token = localStorage.getItem("token");


    if(!token){

        alert("Please login first");

        window.location.href="login.html";

        return;

    }



    const formData = new FormData();


    formData.append(
        "internshipId",
        document.getElementById("internshipId").value
    );


    formData.append(
        "phone",
        document.getElementById("phone").value
    );


    formData.append(
        "college",
        document.getElementById("college").value
    );


    formData.append(
        "skills",
        document.getElementById("skills").value
    );


    formData.append(
        "coverLetter",
        document.getElementById("coverLetter").value
    );


    formData.append(
        "resume",
        document.getElementById("resume").files[0]
    );



    try{


        const response = await fetch(
            `${API_URL}/applications/apply`,
            {

                method:"POST",

                headers:{

                    "Authorization":`Bearer ${token}`

                },

                body:formData

            }
        );



        const data = await response.json();



        if(!response.ok){

            alert(data.message || "Application failed");

            return;

        }



        alert("Application submitted successfully 🎉");


        closeApplicationForm();



    }
    catch(error){

        console.error(error);

        alert("Server error");

    }



});




loadInternships();