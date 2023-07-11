import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";
export default function Login() {
  localStorage.clear();
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(event) {
    event.preventDefault();

    await axios
      .post("http://localhost:5000/users/login/", {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((data) => {
        //console.log(data.access)
        if (data.access) {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          localStorage.setItem("userid", data.userid);
          localStorage.setItem("fullname", data.fullname);
          document.location = "/";
        } else if (data.error) {
          alert(data.error);
        }
      })
      .catch((err) => {
        //alert(err);
        alert(err.response.data.error);
      });
  }
  return (
    <div className={"container"}>
      <h1>Login</h1>
      <form action="POST">
        <input
          id="id_username"
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="username or email"
          value={username}
        />
        <input
          id="id_password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="password"
          value={password}
        />
        <button
          type="submit"
          className="loginbtn"
          disabled={!username || !password}
          value="submit"
          onClick={submit}>
          Login
        </button>
      </form>
      <br />
      <center>
        <p>
          dont have an account ? <Link to={"/create-account"}>Signup</Link>
        </p>
      </center>
    </div>
  );
}
