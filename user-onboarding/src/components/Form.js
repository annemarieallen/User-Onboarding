import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is a required field"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Passwod is a required field"),
  terms: yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
});

export default function Form(props) {
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  // anytime you're working with checkboxes, the value will be called value, not e.target.value
  const validate = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };

  // onChange function
  const inputChange = (e) => {
    e.persist();
    console.log("input changed!", e.target.value, e.target.checked);
    validate(e);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => {
        console.log(props.addUser);
        props.addUser(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
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
          placeholder="email"
          value={formState.email}
          onChange={inputChange}
        ></input>
        {errors.email.lenth > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        ></input>
        {errors.password.length > 8 ? (
          <p className="error">{errors.password}</p>
        ) : null}
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
        {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
      </label>
      <button>Submit</button>
      {/* can also call this in the App.js replacing props.formUsers with users (shown in comments) */}
      <pre>{JSON.stringify(props.formUsers, null, 2)}</pre>
    </form>
  );
}
