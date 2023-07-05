import Navbar from "../Navbar";
import axios from "axios";
import VacancyNavbar from "../VacancyNavbar";
import { useState, useEffect } from "react";
import SingleApp from "./Apps";
import "../../css/applications.css";

function FullApplication({ appl, user, handleDelete }) {
  const [skills, SetSkills] = useState([]);

  useEffect(() => {
    //console.log("appl on full app : ", appl);
    //console.log("user on full app : ", user);
    SetSkills(user.skills);
  });

  function ShortList(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/infor/appl/${appl._id}`)
      .then((response) => response.data)
      .then((data) => {
        handleDelete(e, user.userid);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function Reject(e) {
    e.preventDefault();
    console.log("deleting candidate : ", user.userid);
    handleDelete(e, user.userid);
  }

  function Hire(e) {
    e.preventDefault();
  }

  function VisitProfile(e) {
    e.preventDefault();
    document.location = `/profile/${user.userid}`;
  }

  if (!skills) return <></>;
  return (
    <>
      <div hidden={!appl._id & !user.userid} className="selected-app">
        <div className="applicant-profile-2">
          <img
            width={"150px"}
            height={"120px"}
            src={`http://localhost:5000/profilepicdl/${user.userid}`}
            alt=""
          />
          <h3>{user.fullname}</h3>
          <h4>{user.email}</h4>
          <h4>
            {user.experience} years experienced {user.profession}
          </h4>
        </div>

        <div className="selected-appl-bottom">
          <button onClick={VisitProfile} className="good" id="visit-profile">
            Visit Profile
          </button>

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

          <div
            hidden={appl.cover_letter}
            className="selected-appl-bottom-skills"
          >
            {skills.map((skill) => (
              <p>{skill}</p>
            ))}
          </div>

          <div className="app-btns">
            <button onClick={ShortList} className="good">
              Short-List
            </button>
            <button onClick={Hire} className="good">
              Hire
            </button>
            <button onClick={Reject} className="bad">
              Reject
            </button>
          </div>
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

  function DeleteCandidate(e, candidate) {
    e.preventDefault();
    //console.log("Deleted candidate : ", candidate);
    SetCandidates(
      candidates.map((cand) => {
        //console.log(cand);
        try {
          if (cand.user.userid !== candidate) {
            return cand;
          }
        } catch {}
      })
    );

    Setseleced({});
    SetselecedUser({});
  }
  useEffect(() => {
    //get applications information
    axios
      .get(`http://localhost:5000/infor/${vacaid}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        //console.log("Vacancy data  : ", data);
        SetCandidates(data.users);
        //SetselecedUser(data.users[0]);
      })

      .catch((err) => {
        console.log("Error : ", err.message);
      });
  }, [SetCandidates]);

  //console.log("candidates : ", candidates);

  return (
    <>
      <Navbar />
      <VacancyNavbar vacaid={vacaid} />
      <FullApplication
        appl={selected}
        user={selectedUser}
        handleDelete={DeleteCandidate}
      />
      <div className="app-list">
        {candidates.map((cand, index) => (
          <SingleApp key={index} infor={cand} handleclick={PopulateFullApp} />
        ))}
      </div>
    </>
  );
}
