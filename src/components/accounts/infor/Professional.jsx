import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Navbar";
import UserNavbar from "../UserNavbar";
import "../../../css/userprof.css";
import profile from "../../../icons/profile.png";
export default function Professional() {
  const [account, setAccount] = useState({});
  const [profilepic, setProfilepic] = useState(false);
  const [experience, setExperience] = useState("");
  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [industry, setIndustry] = useState();
  const [imagesource, setSource] = useState("");
  const [newskill, setNewSkill] = useState("");

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
        setExperience(data.account.experience);
        setProfession(data.account.profession);
        setTimeout(() => {
          if (!data.account) return console.log("account not set");
          axios
            .get(`http://localhost:5000/profilepicdl/${data.account._id}`)
            .then((data) => {
              //console.log(data);
              setSource(`http://localhost:5000/profilepicdl/${account._id}`);
              setProfilepic(true);
            })
            .then(() => {
              setSelectedSkills(data.account.skills);
            })
            .catch((err) => {
              console.log(err);
              setSource(profile);
              setProfilepic(false);
              console.log(selectedSkills);
            });
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

    //console.log(selectedSkills);
  }, [setAccount, profilepic, setSelectedSkills]);

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

  if (!selectedSkills) return <></>;

  return (
    <>
      <Navbar />
      <UserNavbar />
      <div className="user-professional-info">
        <div className={"user-professional-info-container"}>
          <div className="info-container-input">
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
          </div>
          <div className="info-container-input">
            {" "}
            <p>Years of Experience</p>
            <input
              id="dob"
              type="number"
              placeholder="1"
              onChange={(event) => setExperience(event.target.value)}></input>
          </div>
          <div className="info-container-input">
            <p>professional title</p>
            <input
              type="text"
              onChange={(event) => setProfession(event.target.value)}
              placeholder="Professional title. (e.g) Real Estate agent"
            />
          </div>
          <div className="info-container-input">
            <p>professional skills</p>
            <div className="skills">
              {skills.map((skill) => (
                <button
                  hidden={selectedSkills.indexOf(skill) !== -1}
                  onClick={handleSkillAdded}>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="info-container-input">
            <input
              type="text"
              onChange={(event) => setNewSkill(event.target.value)}
              placeholder="add another skill"
            />
            <button
              className="add-btn"
              type="reset"
              onClick={(e) => {
                setSelectedSkills([...selectedSkills, newskill]);
              }}>
              Add
            </button>
          </div>
          <br />
        </div>
        <div className="profileinfo">
          <img
            hidden={profilepic}
            className="card1-image"
            src={profile}
            value={profilepic}
            width={"200px"}
            height={"220px"}
            alt="user image"
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
            {selectedSkills.map((sk, index) => (
              <p key={sk}> {sk}, </p>
            ))}
          </div>
          <button
            className="add-btn2"
            type="submit"
            value="submit"
            onClick={handleUpdateProfile}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
