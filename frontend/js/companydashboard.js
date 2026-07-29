// InternConnect - Company Dashboard

const API_URL = "http://localhost:5000/api";

const token = localStorage.getItem("token");

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

    alert("Logged out successfully");

    window.location.href = "login.html";
}

// ==========================
// Load My Internships
// ==========================
async function loadInternships() {

    try {

        const response = await fetch(`${API_URL}/internships/my/internships`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        const container = document.getElementById("internshipContainer");

        container.innerHTML = "";

        if (!response.ok) {
            container.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        if (data.internships.length === 0) {
            container.innerHTML = "<h3>No internships posted yet.</h3>";
            return;
        }

        data.internships.forEach((internship) => {

            const card = document.createElement("div");

            card.className = "internship-card";

            card.innerHTML = `

                <h2>${internship.title}</h2>

                <p><strong>Company:</strong> ${internship.companyName}</p>

                <p>${internship.description}</p>

                <p><strong>Location:</strong> ${internship.location}</p>

                <p><strong>Duration:</strong> ${internship.duration}</p>

                <p><strong>Mode:</strong> ${internship.mode}</p>

                <p><strong>Stipend:</strong> ${internship.stipend}</p>

                <button onclick="viewApplicants('${internship._id}')">
                    View Applicants
                </button>

                <button onclick="deleteInternship('${internship._id}')">
                    Delete
                </button>

            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        alert("Unable to load internships.");

    }

}

// ==========================
// Post Internship
// ==========================
const internshipForm = document.getElementById("internshipForm");

internshipForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const internship = {

        title: document.getElementById("title").value,

        description: document.getElementById("description").value,

        skills: document
            .getElementById("skills")
            .value
            .split(","),

        location: document.getElementById("location").value,

        duration: document.getElementById("duration").value,

        stipend: document.getElementById("stipend").value,

        mode: document.getElementById("mode").value,

        lastDate: document.getElementById("lastDate").value

    };

    try {

        const response = await fetch(`${API_URL}/internships`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(internship)

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            internshipForm.reset();

            loadInternships();

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

});

// ==========================
// Delete Internship
// ==========================
async function deleteInternship(id) {

    if (!confirm("Delete this internship?")) return;

    try {

        const response = await fetch(`${API_URL}/internships/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            loadInternships();

        }

    } catch (error) {

        console.error(error);

    }

}

// ==========================
// View Applicants
// ==========================
function viewApplicants(id) {

    window.location.href = `applicants.html?id=${id}`;

}

// ==========================

loadInternships();