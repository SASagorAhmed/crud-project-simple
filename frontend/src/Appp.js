// Import React and hooks
import React, { useEffect, useState } from "react";

// Main component
function App() {

  // users → store all user data
  const [users, setUsers] = useState([]);

  // name input value
  const [name, setName] = useState("");

  // email input value
  const [email, setEmail] = useState("");

  // editId → store id when editing
  const [editId, setEditId] = useState(null);

  // Backend API URL
  const API = "http://localhost:5000/users";


// ================= READ =================

// Function to get users
const getUsers = async () => {

  // Send GET request to backend
  const res = await fetch(API);

  // Convert response to JSON
  const data = await res.json();

  // Save data in state
  setUsers(data);
};

// Run getUsers when page loads
useEffect(() => {
  getUsers();
}, []);


// ================= CREATE =================

// Function to add user
const addUser = async () => {

  // Check if input is empty
  if (!name || !email) {
    alert("Enter name and email");
    return;
  }

  // Send POST request
  await fetch(API, {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json" // sending JSON
    },
    body: JSON.stringify({ name, email }) // convert JS → JSON
  });

  // Clear input fields
  setName("");
  setEmail("");

  // Reload users
  getUsers();
};


// ================= EDIT SELECT =================

// Select user for editing
const editUser = (user) => {

  // Set id for editing
  setEditId(user.id);

  // Fill inputs with existing data
  setName(user.name);
  setEmail(user.email);
};


// ================= UPDATE =================

// Update user
const updateUser = async () => {

  // Send PUT request
  await fetch(`${API}/${editId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email })
  });

  // Reset edit mode
  setEditId(null);

  // Clear inputs
  setName("");
  setEmail("");

  // Reload users
  getUsers();
};


// ================= DELETE =================

// Delete user
const deleteUser = async (id) => {

  // Send DELETE request
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  // Reload users
  getUsers();
};


// ================= UI =================

return (
  <div>

    {/* Title */}
    <h2>CRUD App</h2>

    {/* Name input */}
    <input
      value={name} // bind state
      onChange={(e) => setName(e.target.value)} // update state
      placeholder="Name"
    />

    {/* Email input */}
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
    />

    {/* Button (Add or Update) */}
    {editId ? (
      <button onClick={updateUser}>Update</button>
    ) : (
      <button onClick={addUser}>Add</button>
    )}

    <hr />

    {/* Show users list */}
    {users.map((u) => (
      <div key={u.id}>

        {/* Show name and email */}
        {u.name} - {u.email}

        {/* Edit button */}
        <button onClick={() => editUser(u)}>Edit</button>

        {/* Delete button */}
        <button onClick={() => deleteUser(u.id)}>Delete</button>

      </div>
    ))}
  </div>
);
}

// Export component
export default App;