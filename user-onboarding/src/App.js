import React, {useState} from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [users, setUsers] = useState([]);

  // addUser is a function – pass user as a prop 
  const addUser = (user) => {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      terms: false,
    };
    setUsers([...users, newUser]);
  };
console.log(users);
  return (
    <div className="App">
      <h1> Welcome! </h1>
      <Form addUser={addUser} formUsers={users}/>
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
    </div>
  );
}

export default App;
