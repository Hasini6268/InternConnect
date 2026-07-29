console.log("My Applications JS Loaded");


// Render Backend URL
const API_URL = "https://internconnect-ngxa.onrender.com/api";


const token = localStorage.getItem("token");

const user = JSON.parse(
    localStorage.getItem("user")
);



const container =
document.getElementById(
    "applicationsContainer"
);



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

function logout(){

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href =
    "login.html";

}




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

                    "Content-Type":"application/json",

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




        // Token expired

        if(
            response.status === 401 ||
            response.status === 403
        ){

            alert(
                "Session expired. Please login again."
            );

            logout();

            return;

        }





        if(!response.ok){


            container.innerHTML = `

            <h3>
            ${data.message || "Unable to load applications"}
            </h3>

            `;


            return;

        }







        if(

            !data.applications ||

            data.applications.length === 0

        ){


            container.innerHTML = `

            <h3>
            No applications submitted yet.
            </h3>

            `;


            return;


        }







        data.applications.forEach(

            application => {



                const internship =
                application.internship;



                const card =
                document.createElement(
                    "div"
                );



                card.className =
                "internship-card";



                card.innerHTML = `


                <h2>

                ${internship?.title || "Internship"}

                </h2>



                <p>

                <strong>
                Company:
                </strong>

                ${
                    internship?.companyName ||
                    "Not Available"
                }

                </p>



                <p>

                <strong>
                Location:
                </strong>

                ${
                    internship?.location ||
                    "Not Available"
                }

                </p>




                <p>

                <strong>
                Duration:
                </strong>

                ${
                    internship?.duration ||
                    "Not Available"
                }

                </p>





                <p>

                <strong>
                Mode:
                </strong>

                ${
                    internship?.mode ||
                    "Not Available"
                }

                </p>





                <p>

                <strong>
                Applied Date:
                </strong>

                ${
                    new Date(
                        application.createdAt
                    ).toLocaleDateString()
                }

                </p>





                <p>

                <strong>
                Status:
                </strong>

                <span>

                ${
                    application.status
                }

                </span>

                </p>


                `;



                container.appendChild(
                    card
                );



            }

        );




    }


    catch(error){


        console.error(
            "My Applications Error:",
            error
        );



        container.innerHTML = `

        <h3>
        Server connection error
        </h3>

        `;


    }


}






// ==========================
// Start
// ==========================

loadApplications();