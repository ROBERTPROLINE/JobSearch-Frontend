import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/signup.css";
import Home from "./Home";
import { render } from "@testing-library/react";

export default function Signup({ level }) {
  const [account, setAccount] = useState({});
  const [profilepic, setProfilepic] = useState(false);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setemail] = useState("");
  const [experience, setExperience] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [profession, setProfession] = useState("");
  const [image, setImage] = useState();
  const [skills, setSkills] = useState([]);
  let [selectedSkills, setSelectedSkills] = useState([]);
  const [industry, setIndustry] = useState();
  const [imagesource, setSource] = useState("");
  const [newskill, setNewSkill] = useState("");
  const [address, setAddress] = useState("");

  const csSkills = [
    "coding",
    "Algorithims",
    "Python",
    "C++",
    "C#",
    "Javascript",
    "node.js",
    "React.js",
    "Next.js",
    "Vue.js",
  ];

  function loadData() {
    if (document.title === "create a new account") return;
    axios
      .get("http://localhost:5000/users/account", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setAccount(data.account);
        setTimeout(() => {
          if (!data.account) return console.log("account not set");
          axios
            .get(`http://localhost:5000/profilepicdl/${data.account._id}`)
            .then((data) => {
              //console.log(data);
              setSource(`http://localhost:5000/profilepicdl/${account._id}`);
              setProfilepic(true);
            })
            .catch((err) => {
              console.log(err);
              setProfilepic(false);
            });
          setExperience(account.experience);
          setProfession(account.profession);
        }, 1000);
      })
      .catch((err) => {
        const error = err.data.error;
        alert(error);
      });
  }

  useEffect(() => {
    loadData();
    setSelectedSkills([]);
    selectedSkills = [...selectedSkills, account.skills];

    //console.log(selectedSkills);
  }, [setAccount, profilepic, setSelectedSkills]);

  async function handleUpdateProfile(e) {
    e.preventDefault();
    console.log("updating my user profile");
    axios
      .patch(
        "http://localhost:5000/users/account",
        {
          //account information that has changed
          skills: selectedSkills,
          industry,
          profession,
          experience,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((resp) => resp.data)
      .then((data) => {
        if (data.success) {
          return (document.location = "/");
        } else {
          alert(data.error);
        }
      })
      .catch((err) => {
        //const error = err.data.error;
        return alert(err.message);
      });
  }
  async function handleIndustrySelect(e) {
    e.preventDefault();
    setSkills([]);
    console.log(e.target.value);
    if (e.target.value === "sd") {
      setSkills(csSkills);
    }
  }

  async function handleSkillAdded(e) {
    e.preventDefault();
    console.log(e.target.innerText);
    setSelectedSkills([...selectedSkills, e.target.innerText]);
    setSkills(
      skills.filter((sk) => {
        if (sk !== e.target.innerText) {
          return sk;
        }
      })
    );
  }
  async function handleChangeImage(e) {
    e.preventDefault();
    console.log(image);
    if (!image || image === "") return;
    setImage(e.target.files[0]);
    setProfilepic("");
    const formData = new FormData();
    formData.append("profileImg", image);
    axios
      .post(`http://localhost:5000/profile_pic/`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          setProfilepic(true);
          //document.location = "/professional_information";
        }, 1000);

        setImage("");
      });
  }
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

  if (!level) {
    document.title = "create a new account";
    return (
      <div className={"co"}>
        <div className={"container1"}>
          <h3>user information</h3>
          <form action="POST">
            <input
              type="text"
              placeholder="Fullname"
              onChange={(event) => setFullname(event.target.value)}
            ></input>
            <input
              type="email"
              placeholder="email@example.com"
              onChange={(event) => setemail(event.target.value)}
            ></input>
            <input
              type="text"
              placeholder="address"
              onChange={(event) => setAddress(event.target.value)}
            ></input>
            <input
              type="text"
              placeholder="username"
              onChange={(event) => setUsername(event.target.value)}
            ></input>
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
              onClick={submit}
            >
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
  } else if (level === "professional") {
    document.title = "50% done - professional information";

    return (
      <>
        <div className="professional-info">
          <div className={"container2"}>
            <form action="POST">
              <p>Your Industry</p>
              <select name="" id="" onChange={handleIndustrySelect}>
                <option value="IT">IT, Computer Science</option>
                <option value="IT">Data Science / informatics</option>
                <option value="sd">Software Development</option>
                <option value="IT">Marketing</option>
                <option value="IT">Finance</option>
                <option value="IT">Human Resources</option>
                <option value="IT">Graphics Design</option>
              </select>
              <p>Years of Experience</p>
              <input
                id="dob"
                type="number"
                placeholder="1"
                onChange={(event) => setExperience(event.target.value)}
              ></input>
              <p>professional title</p>
              <input
                type="text"
                onChange={(event) => setProfession(event.target.value)}
                placeholder="Professional title. (e.g) Real Estate agent"
              />
              <p>professional skills</p>
              <div className="skills">
                {skills.map((skill) => (
                  <button onClick={handleSkillAdded}>{skill}</button>
                ))}
              </div>
              <div className="newskill">
                <input
                  type="text"
                  onChange={(event) => setNewSkill(event.target.value)}
                  placeholder="add another skill"
                />
                <button
                  type="reset"
                  onClick={(e) => {
                    setSelectedSkills([...selectedSkills, newskill]);
                  }}
                >
                  Add
                </button>
              </div>
            </form>
            <br />
          </div>
          <div className="profileinfo">
            <input
              hidden={profilepic}
              type="file"
              name=""
              id=""
              onChange={(e) => setImage(e.target.files[0])}
              onMouseLeave={handleChangeImage}
            />
            <img
              hidden={!profilepic}
              className="card1-image"
              src={imagesource}
              value={profilepic}
              width={"200px"}
              height={"220px"}
              alt="user image"
            />
            <p>{account.fullname}</p>
            <p>{account.email}</p>
            <p>
              {experience} Years Experienced {profession}
            </p>

            <div className="sskills">
              <ul>
                {selectedSkills.map((sk, index) => (
                  <li>{sk}, </li>
                ))}
              </ul>
            </div>
            <button
              className="savebtn"
              type="submit"
              value="submit"
              onClick={handleUpdateProfile}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }

  if (level === "projects") {
    document.title = "100% done";

    return (
      <>
        <div className="projects-info"></div>
      </>
    );
  }
}
