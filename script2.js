let complaints = [];

const API = "https://jsonplaceholder.typicode.com/posts";

function addComplaint() {

    let complaint = {

        name: document.getElementById("name").value,

        room: document.getElementById("room").value,

        category: document.getElementById("category").value,

        description:
            document.getElementById("description").value,

        status: "Pending"
    };

    if (
        complaint.name == "" ||
        complaint.room == "" ||
        complaint.category == "" ||
        complaint.description == ""
    ) {
        document.getElementById("message").innerText =
            "Please fill all fields";

        return;
    }

    fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(complaint)

    })
    .then(response => response.json())
    .then(data => {

        complaint.id = data.id;

        complaints.push(complaint);

        showComplaints();

        document.getElementById("message").innerText =
            "Complaint submitted!";

    });
}


function showComplaints() {

    let search =
        document.getElementById("search").value.toLowerCase();

    let output = "";

    complaints.forEach(function(c) {

        if (
            c.name.toLowerCase().includes(search) ||
            c.category.toLowerCase().includes(search)
        ) {

            output += `

                <div class="complaint">

                    <b>${c.name}</b>

                    <p>Room: ${c.room}</p>

                    <p>Category: ${c.category}</p>

                    <p>${c.description}</p>

                    <p>Status: ${c.status}</p>

                    <button
                        class="delete"
                        onclick="deleteComplaint(${c.id})">
                        Delete
                    </button>

                </div>

            `;
        }

    });

    document.getElementById("complaints").innerHTML = output;
}


function deleteComplaint(id) {

    complaints =
        complaints.filter(c => c.id != id);

    showComplaints();
}
