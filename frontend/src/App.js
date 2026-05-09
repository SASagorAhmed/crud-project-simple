import React, { useEffect, useState } from "react";

function App() {
  const API = "http://localhost:5000";

  const [page, setPage] = useState("home");

  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");
  const [editId, setEditId] = useState(null);

  const getPatients = async () => {
    const res = await fetch(`${API}/patients`);
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    getPatients();
  }, []);

  const addPatient = async () => {
    await fetch(`${API}/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, disease })
    });

    setName("");
    setAge("");
    setDisease("");
    getPatients();
    setPage("update");
  };

  const updatePatient = async () => {
    await fetch(`${API}/patients/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, disease })
    });

    setName("");
    setAge("");
    setDisease("");
    setEditId(null);
    getPatients();
    setPage("update");
  };

  const editPatient = (p) => {
    setEditId(p.id);
    setName(p.name);
    setAge(p.age);
    setDisease(p.disease);
    setPage("edit");
  };

  // HOME PAGE
  if (page === "home") {
    return (
      <div>
        <h2>Home Lookdssdsdsdsdsds</h2>
        <button onClick={() => setPage("add")}>Add Patient</button>
        <button onClick={() => setPage("update")}>Update Patient</button>
      </div>
    );
  }

  // ADD PAGE
  if (page === "add") {
    return (
      <div>
        <h2>Add Patient final</h2>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
        <input placeholder="Disease" onChange={(e) => setDisease(e.target.value)} />

        <button onClick={addPatient}>Add</button>
        <button onClick={() => setPage("home")}>Back</button>
      </div>
    );
  }

  // UPDATE PAGE (TABLE)
  if (page === "update") {
    return (
      <div>
        <h2>Update Patient</h2>

        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Disease</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.disease}</td>
                <td>
                  <button onClick={() => editPatient(p)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => setPage("home")}>Back</button>
      </div>
    );
  }

  // EDIT PAGE
  if (page === "edit") {
    return (
      <div>
        <h2>Edit Patient</h2>

        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={age} onChange={(e) => setAge(e.target.value)} />
        <input value={disease} onChange={(e) => setDisease(e.target.value)} />

        <button onClick={updatePatient}>Save</button>
        <button onClick={() => setPage("update")}>Back</button>
      </div>
    );
  }

  return null;
}

export default App;