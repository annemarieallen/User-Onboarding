import React, { useState, useEffect } from "react";
// import * as yup from "yup";
// import axios from "axios";

export default function Form() {
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  // onChange function
  const inputChange = (e) => {
    e.persist();
    // console.log("input changed!", e.target.value, e.target.checked);
    // validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted!");
    // axios
    //   .post("https://reqres.in/api/users", formState)
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={inputChange}
        ></input>
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={inputChange}
        ></input>
      </label>
      <label htmlFor="password">
        Password 
        <input 
          type="password" 
          name="password" 
          id="password"
          ></input>
      </label>
      <label htmlFor="terms">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        ></input>
        Terms and Conditions
      </label>
    </form>
  );
}
