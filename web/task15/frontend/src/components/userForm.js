import { useState } from "react";
import API from "../api";

function UserForm({ fetchUsers }) {
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", age: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, age } = form;

    if (!name || !email || !age) {
      setError("Please fill all fields (name, email, age)");
      return;
    }

    
    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setError(""); 

    await API.post("/", form);
    fetchUsers();

    setForm({ name: "", email: "", age: "" });
  };

  return (
    <div
      style={{
        border: "2px solid black",
        padding: "20px",
        boxShadow: "8px 8px 0 black",
        marginBottom: "20px",
      }}
    >
      {error && (
        <p
          style={{
            border: "2px solid black",
            padding: "8px",
            background: "black",
            color: "white",
            marginBottom: "10px",
          }}
        >
          {error}
        </p>
      )}
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={form.name}
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
      />
      <input
        name="age"
        placeholder="Age"
        onChange={handleChange}
        value={form.age}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default UserForm;
