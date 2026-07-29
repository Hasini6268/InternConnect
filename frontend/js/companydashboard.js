console.log("Company Dashboard JS Loaded");


// Render Backend URL
const API_URL = "https://internconnect-ngxa.onrender.com/api";


const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));



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

    window.location.href = "login.html";

}






// ==========================
// Load My Internships
// ==========================

async function loadInternships(){

    try{


        const response = await fetch(

            `${API_URL}/internships/my/internships`,

            {

                headers:{

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );



        const data = await response.json();



        console.log(
            "My Internships:",
            data
        );



        const container =
        document.getElementById(
            "internshipContainer"
        );



        if(!container) return;



        container.innerHTML = "";



        if(!response.ok){


            container.innerHTML =
            `<h3>${data.message || "Unable to load internships"}</h3>`;

            return;

        }





        if(
            !data.internships ||
            data.internships.length === 0
        ){

            container.innerHTML =
            "<h3>No internships posted yet.</h3>";

            return;

        }





        data.internships.forEach(internship => {


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
            <strong>Company:</strong>
            ${internship.companyName || "N/A"}
            </p>


            <p>
            <strong>Location:</strong>
            ${internship.location || "N/A"}
            </p>


            <p>
            <strong>Duration:</strong>
            ${internship.duration || "N/A"}
            </p>


            <p>
            <strong>Mode:</strong>
            ${internship.mode || "N/A"}
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
            "Unable to connect with server"
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



// Get logged in company details

const companyName =
user?.companyName ||
user?.fullName ||
"Company";





const internship = {


title:
document.getElementById("title").value.trim(),



description:
document.getElementById("description").value.trim(),



companyName: companyName,



skills:
document
.getElementById("skills")
.value
.split(",")
.map(skill => skill.trim()),



location:
document.getElementById("location").value.trim(),



duration:
document.getElementById("duration").value.trim(),



stipend:
document.getElementById("stipend").value.trim(),



mode:
document.getElementById("mode").value.trim(),



lastDate:
document.getElementById("lastDate").value



};





try{


const response =
await fetch(

`${API_URL}/internships`,

{


method:"POST",


headers:{


"Content-Type":
"application/json",


Authorization:
`Bearer ${token}`


},


body:
JSON.stringify(internship)


}

);





const data =
await response.json();



console.log(
"Post Internship:",
data
);




if(response.ok){


alert(
"Internship created successfully 🎉"
);


internshipForm.reset();


loadInternships();


}

else{


alert(
data.message ||
"Failed to create internship"
);


}



}


catch(error){


console.error(
"Post Error:",
error
);


alert(
"Server Error"
);


}



});


}









// ==========================
// Delete Internship
// ==========================

async function deleteInternship(id){



if(
!confirm(
"Delete this internship?"
)

)
return;





try{


const response =
await fetch(

`${API_URL}/internships/${id}`,

{


method:"DELETE",


headers:{


Authorization:
`Bearer ${token}`


}


}

);





const data =
await response.json();



alert(
data.message ||
"Deleted"
);




if(response.ok){

loadInternships();

}



}


catch(error){


console.error(
"Delete Error:",
error
);


}



}









// ==========================
// View Applicants
// ==========================


function viewApplicants(id){


window.location.href =
`applicants.html?id=${id}`;


}







// Start Dashboard

loadInternships();