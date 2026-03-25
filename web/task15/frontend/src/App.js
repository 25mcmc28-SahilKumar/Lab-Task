import { useState, useEffect } from "react";
import API from "./api";
import UserForm from "./components/userForm";
import UserList from "./components/userList";

function App() {
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = () => setRefresh(!refresh);

    return (
        <div>
            <h1
            style={{
                borderBottom:" 3px solid black",
                display:"inline-block",
                paddingBottom:"5px"
            }}>CRUD App</h1>

            <UserForm fetchUsers={triggerRefresh} />
            <UserList refresh={refresh} />
        </div>
    );
}

export default App;