import { useEffect, useState } from "react";
import API from "../api";

function UserList({ refresh }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", age: "" });
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const startEdit = (user) => {
    setEditingUser(user.id);
    setEditForm(user);
  };

  const updateUser = async () => {
    await API.put(`/${editingUser}`, editForm);
    setEditingUser(null);
    getUsers();
  };

  const getUsers = async () => {
    const res = await API.get(`/?page=${page}&search=${search}`);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, [page, search, refresh]);

  const deleteUser = async (id) => {
    await API.delete(`/${id}`);
    getUsers();
  };

  return (
    <div>
      <input
        style={{
          width: "100%",
          maxWidth: "300px",
          marginBottom: "10px",
        }}
        placeholder="Search name/email"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {users.map((u) => (
        <div
          key={u.id}
          style={{
            border: "2px solid black",
            padding: "10px",
            margin: "10px 0",
            boxShadow: "6px 6px 0 black",
          }}
        >
          {editingUser === u.id ? (
            <>
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
              <input
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
              />
              <input
                value={editForm.age}
                onChange={(e) =>
                  setEditForm({ ...editForm, age: e.target.value })
                }
              />

              <button onClick={updateUser}>Update</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </>
          ) : (
            <>
              {u.name} | {u.email} | {u.age}
              <button
                onClick={() => startEdit(u)}
                style={{
                  marginRight: "5px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(u.id)}
                style={{
                  background: "black",
                  color: "white",
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}

      <button disabled={page === 1} onClick={() => setPage(page - 1)}
        style={{marginTop:"20px"}}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}
        style={{marginLeft:"15px"}}>Next</button>
    </div>
  );
}

export default UserList;
