import React, {useState} from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [users, setUsers] = useState([]);

  // addUser is a function – pass this user as a prop 
  const addUser = (user) => {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      terms: false,
    };
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <h1> Welcome! </h1>
      <Form />
    </div>
  );
}

export default App;
