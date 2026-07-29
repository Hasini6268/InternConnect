// InternConnect - Applicants

const API_URL = "http://localhost:5000/api";

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
}

const applicantsContainer = document.getElementById("applicantsContainer");

// Get internship id from URL
const params = new URLSearchParams(window.location.search);
const internshipId = params.get("id");

// ===============================
// Load Applicants
// ===============================
async function loadApplicants() {

    if (!internshipId) {
        applicantsContainer.innerHTML = "<h3>Invalid Internship.</h3>";
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/applications/applicants/${internshipId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        applicantsContainer.innerHTML = "";

        if (!response.ok) {
            applicantsContainer.innerHTML = `<h3>${data.message}</h3>`;
            return;
        }

        if (data.applications.length === 0) {
            applicantsContainer.innerHTML =
                "<h3>No students have applied yet.</h3>";
            return;
        }

        data.applications.forEach(application => {

            const student = application.student;

            const card = document.createElement("div");

            card.className = "internship-card";

            card.innerHTML = `
                <h2>${student.fullName}</h2>

                <p><strong>Email:</strong> ${student.email}</p>

                <p><strong>Phone:</strong> ${student.phone || "Not Available"}</p>

                <p><strong>College:</strong> ${student.college || "Not Available"}</p>

                <p><strong>Status:</strong> ${application.status}</p>

                <select id="status-${application._id}">
                    <option value="Pending">Pending</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <br><br>

                <button onclick="updateStatus('${application._id}')">
                    Update Status
                </button>
            `;

            applicantsContainer.appendChild(card);

            document.getElementById(`status-${application._id}`).value =
                application.status;

        });

    } catch (error) {

        console.error(error);

        applicantsContainer.innerHTML =
            "<h3>Unable to load applicants.</h3>";

    }
}

// ===============================
// Update Status
// ===============================
async function updateStatus(applicationId) {

    const status =
        document.getElementById(`status-${applicationId}`).value;

    try {

        const response = await fetch(
            `${API_URL}/applications/status/${applicationId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({ status })
            }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            loadApplicants();
        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }
}

loadApplicants();