import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/signup.css";
import Home from "./Home";
import { render } from "@testing-library/react";

export default function Signup({ level }) {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const [address, setAddress] = useState("");

  async function submit(e) {
    //save the addded account information
    e.preventDefault();
    if (password !== password1) return alert("passwords mismatch");

    axios
      .post("http://localhost:5000/users/signup", {
        username,
        password,
        email,
        fullname,
        address,
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        if (data.access) {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          return (document.location = "/professional-information");
        }
        return alert(data.error);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }

  return (
    <div className={"co"}>
      <div className={"container1"}>
        <h3>user information</h3>
        <form action="POST">
          <input
            type="text"
            placeholder="Fullname"
            onChange={(event) => setFullname(event.target.value)}></input>
          <input
            type="email"
            placeholder="email@example.com"
            onChange={(event) => setemail(event.target.value)}></input>
          <input
            type="text"
            placeholder="address"
            onChange={(event) => setAddress(event.target.value)}></input>
          <input
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}></input>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
          />
          <input
            type="password"
            onChange={(event) => setPassword1(event.target.value)}
            placeholder="verify password"
          />
          <button
            className="loginbtn"
            type="submit"
            value="submit"
            onClick={submit}>
            Create Account
          </button>
        </form>
        <br />
        <center>
          <p>
            already have an account <Link to={"/"}>Login Page</Link>
          </p>
        </center>
      </div>
    </div>
  );
}
