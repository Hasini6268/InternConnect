console.log("Applicants JS Loaded");


// Render Backend URL
const API_URL = "https://internconnect-ngxa.onrender.com/api";


const token = localStorage.getItem("token");



// ==========================
// Check Login
// ==========================

if (!token) {

    alert("Please login first");

    window.location.href = "login.html";

}




const applicantsContainer =
document.getElementById(
    "applicantsContainer"
);




// Get Internship ID

const params =
new URLSearchParams(
    window.location.search
);


const internshipId =
params.get("id");






// ==========================
// Load Applicants
// ==========================

async function loadApplicants(){


    if(!internshipId){


        applicantsContainer.innerHTML =
        "<h3>Invalid Internship ID</h3>";

        return;

    }





    try{


        const response =
        await fetch(

            `${API_URL}/applications/applicants/${internshipId}`,

            {

                headers:{

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );





        const data =
        await response.json();




        console.log(
            "Applicants:",
            data
        );




        applicantsContainer.innerHTML = "";





        if(!response.ok){


            applicantsContainer.innerHTML = `

            <h3>
            ${
                data.message ||
                "Unable to load applicants"
            }
            </h3>

            `;


            return;

        }







        if(

            !data.applications ||
            data.applications.length === 0

        ){


            applicantsContainer.innerHTML =
            "<h3>No students applied yet.</h3>";


            return;

        }








        data.applications.forEach(

            application => {



                const student =
                application.student || {};




                const card =
                document.createElement(
                    "div"
                );



                card.className =
                "internship-card";





                card.innerHTML = `



                <h2>

                ${student.fullName || "Student"}

                </h2>





                <p>

                <strong>
                Email:
                </strong>

                ${
                    student.email ||
                    "Not Available"
                }

                </p>






                <p>

                <strong>
                Phone:
                </strong>

                ${
                    application.phone ||
                    student.phone ||
                    "Not Available"
                }

                </p>






                <p>

                <strong>
                College:
                </strong>

                ${
                    application.college ||
                    student.college ||
                    "Not Available"
                }

                </p>






                <p>

                <strong>
                Skills:
                </strong>

                ${
                    application.skills ||
                    "Not Available"
                }

                </p>







                <p>

                <strong>
                Cover Letter:
                </strong>

                <br>

                ${
                    application.coverLetter ||
                    "Not Provided"
                }

                </p>







                <p>

                <strong>
                Resume:
                </strong>


                ${
                    application.resume

                    ?

                    `<a href="https://internconnect-ngxa.onrender.com/${application.resume}"
                    target="_blank">

                    View Resume

                    </a>`

                    :

                    "Not Uploaded"

                }


                </p>








                <p>

                <strong>
                Current Status:
                </strong>

                ${
                    application.status
                }


                </p>







                <select id="status-${application._id}">


                    <option value="Pending">
                    Pending
                    </option>


                    <option value="Reviewed">
                    Reviewed
                    </option>


                    <option value="Shortlisted">
                    Shortlisted
                    </option>


                    <option value="Interview Scheduled">
                    Interview Scheduled
                    </option>


                    <option value="Selected">
                    Selected
                    </option>


                    <option value="Rejected">
                    Rejected
                    </option>


                </select>





                <br><br>






                <button

                onclick="updateStatus('${application._id}')"

                >

                Update Status

                </button>




                `;





                applicantsContainer.appendChild(card);






                document.getElementById(
                    `status-${application._id}`
                ).value = application.status;





            }

        );




    }


    catch(error){


        console.error(
            "Applicants Error:",
            error
        );



        applicantsContainer.innerHTML = `

        <h3>
        Server connection error
        </h3>

        `;


    }


}









// ==========================
// Update Application Status
// ==========================

async function updateStatus(applicationId){



    const status =
    document.getElementById(
        `status-${applicationId}`
    ).value;





    try{


        const response =
        await fetch(


            `${API_URL}/applications/status/${applicationId}`,


            {


                method:"PUT",


                headers:{


                    "Content-Type":
                    "application/json",


                    Authorization:
                    `Bearer ${token}`


                },


                body:
                JSON.stringify({

                    status

                })


            }


        );






        const data =
        await response.json();





        console.log(

            "Status Update:",
            data

        );





        alert(

            data.message ||
            "Status updated"

        );





        if(response.ok){


            loadApplicants();


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



}







// Start

loadApplicants();