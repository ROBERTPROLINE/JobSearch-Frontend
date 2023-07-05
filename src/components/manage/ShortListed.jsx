import Navbar from "../Navbar";
import axios from "axios";
import VacancyNavbar from "../VacancyNavbar";
import { useState, useEffect } from "react";
import SingleApp from "./Apps";
import "../../css/applications.css";

function FullApplication({ appl, user }) {
  return (
    <>
      <div hidden={!appl._id} className="selected-app">
        <div className="applicant-profile-2">
          <img
            width={"150px"}
            height={"120px"}
            src={`http://localhost:5000/profilepicdl/${user._id}`}
            alt=""
          />
          <h3>{user.fullname}</h3>
          <h4>
            {user.experience} years experienced {user.profession}
          </h4>
        </div>
        <button className="good">Visit Profile</button>

        <div className="cover-letter2">
          <textarea
            disabled
            hidden={!appl.cover_letter}
            name=""
            id=""
            cols="60"
            rows="10"
            value={appl.cover_letter}
          ></textarea>
        </div>

        <div className="app-btns">
          <button className="good">Short-List</button>
          <button className="good">Contact</button>
          <button className="bad">Reject</button>
        </div>
      </div>
    </>
  );
}
export default function ManageApplications() {
  //manage applications posted for my vacancy

  document.title = "vacancy - applications";
  const vacaid = document.location.pathname.split("/")[2];

  //manage short listed applications

  const [candidates, SetCandidates] = useState([]);
  const [candidateInfor, SetCandidateInfor] = useState([]);
  const [selected, Setseleced] = useState({});
  const [selectedUser, SetselecedUser] = useState({});
  function PopulateFullApp(e, appl, user) {
    e.preventDefault();
    Setseleced(appl);
    SetselecedUser(user);
  }
  useEffect(() => {
    //get applications information
    axios
      .get(`http://localhost:5000/infor/short-listed/${vacaid}/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log("Vacancy data  : ", data);
        SetCandidates(data.users);
      })

      .catch((err) => {
        console.log("Error : ", err.message);
      });
  }, [SetCandidates]);

  return (
    <>
      <Navbar />
      <VacancyNavbar vacaid={vacaid} />
      <FullApplication appl={selected} user={selectedUser} />
      <div className="app-list">
        {candidates.map((cand) => (
          <SingleApp
            key={cand.userid}
            infor={cand}
            handleclick={PopulateFullApp}
          />
        ))}
      </div>
    </>
  );
}
