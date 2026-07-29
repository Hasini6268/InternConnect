// InternConnect - myapplications.js


const API_URL = "http://localhost:5000/api";


const applicationsContainer = document.getElementById(
    "applicationsContainer"
);



async function loadApplications() {


    const token = localStorage.getItem("token");


    if (!token) {

        alert("Please login first");

        window.location.href = "login.html";

        return;

    }



    try {


        const response = await fetch(
            `${API_URL}/applications/my-applications`,
            {

                method: "GET",

                headers: {

                    "Authorization": `Bearer ${token}`

                }

            }
        );



        const data = await response.json();



        console.log(data);



        if (!response.ok) {

            alert(data.message || "Failed to load applications");

            return;

        }



        applicationsContainer.innerHTML = "";



        if (!data.applications || data.applications.length === 0) {


            applicationsContainer.innerHTML = `

                <h3>
                    No applications found
                </h3>

            `;


            return;

        }



        data.applications.forEach((application) => {



            const card = document.createElement("div");


            card.classList.add("internship-card");



            card.innerHTML = `


                <h2>
                    ${application.internship.title}
                </h2>


                <p>
                    <strong>Company:</strong>
                    ${
                        application.internship.companyName ||
                        "Not specified"
                    }
                </p>


                <p>
                    <strong>Description:</strong>
                    ${
                        application.internship.description ||
                        "No description available"
                    }
                </p>


                <p>
                    <strong>Location:</strong>
                    ${
                        application.internship.location ||
                        "Remote"
                    }
                </p>


                <p>
                    <strong>Duration:</strong>
                    ${
                        application.internship.duration ||
                        "Not specified"
                    }
                </p>


                <p>
                    <strong>Stipend:</strong>
                    ${
                        application.internship.stipend ||
                        "Not specified"
                    }
                </p>


                <p>
                    <strong>Mode:</strong>
                    ${
                        application.internship.mode ||
                        "Not specified"
                    }
                </p>


                <p>
                    <strong>Application Status:</strong>
                    ${
                        application.status
                    }
                </p>


                <p>
                    <strong>Applied On:</strong>
                    ${
                        new Date(
                            application.createdAt
                        ).toDateString()
                    }
                </p>


            `;



            applicationsContainer.appendChild(card);



        });



    } catch(error) {


        console.error(error);


        alert("Cannot connect to server");


    }


}



loadApplications();