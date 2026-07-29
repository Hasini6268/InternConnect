console.log("Student Dashboard JS Loaded");


// ==========================
// Render Backend URL
// ==========================

const API_URL =
"https://internconnect-ngxa.onrender.com/api";



// ==========================
// User Data
// ==========================

const token =
localStorage.getItem("token");


let user = null;


try {

    user =
    JSON.parse(
        localStorage.getItem("user")
    );

}
catch(error){

    console.error(
        "User Data Error:",
        error
    );

}





// ==========================
// Check Login
// ==========================

if(!token){

    window.location.href =
    "login.html";

}





// ==========================
// Display Student Name
// ==========================

if(user){


    const name =
    document.getElementById(
        "studentName"
    );


    if(name){

        name.textContent =
        user.fullName ||
        "Student";

    }


}







// ==========================
// Logout
// ==========================

function logout(){


    localStorage.removeItem(
        "token"
    );


    localStorage.removeItem(
        "user"
    );


    window.location.href =
    "login.html";


}








// ==========================
// Load Dashboard
// ==========================

async function loadDashboard(){



try{



// --------------------------
// Internship Count
// --------------------------


const internshipResponse =
await fetch(

`${API_URL}/internships`

);



const internshipData =
await internshipResponse.json();



console.log(
"Internship Data:",
internshipData
);



const internshipCount =
document.getElementById(
"internshipCount"
);



if(internshipCount){


    internshipCount.textContent =

    internshipData.totalInternships ||

    internshipData.internships?.length ||

    internshipData.count ||

    0;


}








// --------------------------
// Student Applications
// --------------------------


const applicationResponse =
await fetch(

`${API_URL}/applications/my-applications`,

{

method:"GET",

headers:{


Authorization:
`Bearer ${token}`


}

}

);





const applicationData =
await applicationResponse.json();



console.log(
"Application Data:",
applicationData
);







// Token expired

if(
applicationResponse.status === 401 ||
applicationResponse.status === 403
){


alert(
"Session expired. Please login again."
);


logout();

return;


}







const applications =

applicationData.applications || [];







// Application Count


const applicationCount =
document.getElementById(
"applicationCount"
);



if(applicationCount){


applicationCount.textContent =
applications.length;


}








// Shortlisted Count


const shortlisted =

applications.filter(

application =>

application.status === "Shortlisted"

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

catch(error){



console.error(
"Dashboard Loading Error:",
error
);




const ids = [

"internshipCount",

"applicationCount",

"shortlistedCount"

];



ids.forEach(id=>{


const element =
document.getElementById(id);



if(element){

element.textContent =
0;

}


});



}



}









// ==========================
// Start Dashboard
// ==========================

loadDashboard();