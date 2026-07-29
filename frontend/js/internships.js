console.log("Internships JS Loaded");


// Render Backend URL
const API_URL = "https://internconnect-ngxa.onrender.com/api";


const token = localStorage.getItem("token");


const container =
document.getElementById("internshipContainer");




// ==========================
// Load All Internships
// ==========================

async function loadInternships(){


    try{


        const response = await fetch(
            `${API_URL}/internships`
        );



        const data =
        await response.json();



        console.log(
            "Internships Response:",
            data
        );



        container.innerHTML = "";



        if(!response.ok){


            container.innerHTML =
            `<h3>${data.message || "Unable to load internships"}</h3>`;

            return;

        }




        const internships =
        data.internships || [];





        if(internships.length === 0){


            container.innerHTML =
            "<h3>No internships available</h3>";

            return;

        }





        internships.forEach(
        internship => {



            const card =
            document.createElement("div");



            card.className =
            "internship-card";



            card.innerHTML = `


                <h2>
                ${internship.title}
                </h2>



                <p>
                ${internship.description}
                </p>




                <p>

                <strong>
                Company:
                </strong>

                ${
                    internship.companyName ||
                    internship.company?.fullName ||
                    "Company"
                }

                </p>




                <p>

                <strong>
                Location:
                </strong>

                ${
                    internship.location ||
                    "Not specified"
                }

                </p>




                <p>

                <strong>
                Duration:
                </strong>

                ${
                    internship.duration ||
                    "Not specified"
                }

                </p>




                <p>

                <strong>
                Mode:
                </strong>

                ${
                    internship.mode ||
                    "Not specified"
                }

                </p>




                <button 
                onclick="applyInternship('${internship._id}')">

                    Apply Now

                </button>



            `;




            container.appendChild(card);



        });




    }
    catch(error){


        console.error(
            "Internship Loading Error:",
            error
        );


        container.innerHTML =
        "<h3>Server connection error</h3>";

    }


}








// ==========================
// Apply Internship
// ==========================

async function applyInternship(id){



    if(!token){


        alert(
            "Please login first"
        );


        window.location.href =
        "login.html";


        return;

    }





    try{


        const formData =
        new FormData();



        formData.append(
            "internshipId",
            id
        );





        const response =
        await fetch(

            `${API_URL}/applications/apply`,

            {


                method:"POST",


                headers:{


                    Authorization:
                    `Bearer ${token}`


                },


                body:formData


            }

        );





        const data =
        await response.json();




        console.log(
            "Apply Response:",
            data
        );





        if(response.ok){


            alert(

                data.message ||
                "Application submitted successfully"

            );


        }
        else{


            alert(

                data.message ||
                "Application failed"

            );


        }





    }
    catch(error){


        console.error(
            "Apply Error:",
            error
        );


        alert(
            "Server error while applying"
        );


    }



}







// ==========================
// Start
// ==========================

loadInternships();