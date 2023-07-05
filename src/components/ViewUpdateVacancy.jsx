import axios from "axios";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import VacancyNavbar from "./VacancyNavbar";
import "../css/manage.css";
import ViewVacancyComonents from "./CsViewVacancy";

function EditVacancycomponent({ infor }) {
  document.title = "Managing vacancy";
  const [skills, Setskills] = useState([]);
  const [newskill, setNewSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [duties, setDuties] = useState([]);
  const [newduty, setnewduty] = useState("");

  const [requirements, setRequirements] = useState([]);
  const [newreq, setnewreq] = useState("");
  const [cover_letter, setCoverLetter] = useState(false);

  const [positions, setpositions] = useState("");

  const nd = new Date(infor.closingDate).toDateString();

  console.log(infor);
  useEffect(() => {
    Setskills(infor.skills);
    setRequirements(infor.requirements);
    setDuties(infor.duties_and_responsibilities);
    setpositions(infor.positions);
    setCoverLetter(infor.cover_letter);

    setTimeout(() => {
      const toView = document
        .getElementsByClassName("vaca-manage-skills")
        .item(0);
      toView.removeAttribute("id");
    }, 1000);
  }, [Setskills]);

  let expiry = nd;

  function handleUpdate(category, data) {
    console.log("updating : ", category, " with :  ", data);
    axios
      .patch(
        `http://localhost:5000/vaca/${infor._id}/${category}`,
        {
          update: data,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        return console.log(data);
      })
      .catch((err) => {
        console.log(err);
        return console.log(err.data);
      });
  }
  function handleSkillAdded(e) {
    e.preventDefault();
    handleUpdate("skills", newskill);
    Setskills([...skills, newskill]);
    setNewSkill("");
  }

  function handleReqAdded(e) {
    e.preventDefault();
    handleUpdate("requirements", newreq);

    setRequirements([...requirements, newreq]);
    setnewreq("");
  }

  function handleReqDeleted(e) {
    e.preventDefault();
    setRequirements(
      requirements.filter((req) => {
        return req !== e.target.innerHTML;
      })
    );
  }

  function handleSkillDeleted(e) {
    e.preventDefault();
    Setskills(
      skills.filter((skill) => {
        return skill !== e.target.innerHTML;
      })
    );
  }

  function handleDutyAdded(e) {
    e.preventDefault();
    handleUpdate("duties", newduty);
    setDuties([...duties, newduty]);
    setnewduty("");
  }

  function handleDutyDeleted(e) {
    e.preventDefault();
    setDuties(
      duties.filter((duty) => {
        return duty !== e.target.innerHTML;
      })
    );
  }

  function handleNavClick(item) {
    //handle a click on the navbar in the manage vacancy page
    const classList = [
      "vaca-manage-skills",
      "vaca-manage-reqs",
      "vaca-manage-duties",
      "vaca-manage-positions",
      "vaca-manage-docs",
    ];

    const classListObjects = {
      Skills: "vaca-manage-skills",
      Requirements: "vaca-manage-reqs",
      Responsibilities: "vaca-manage-duties",
      Positions: "vaca-manage-positions",
      "Cover Letter": "vaca-manage-docs",
    };
    const category = document.getElementById(item).innerHTML;

    classList.forEach((cls) => {
      //console.log(ele === classListObjects[element.innerHTML]);
      if (cls === classListObjects[category]) {
        const toView = document.getElementsByClassName(cls).item(0);
        toView.removeAttribute("id");
        return console.log(toView);
      }
      const toHide = document.getElementsByClassName(cls).item(0);
      toHide.setAttribute("id", "hid");
    });
    //return console.log(classListObjects[element.innerHTML]);

    return "abc";
  }
  return (
    <div className="manage-vaca">
      <div className="vaca-info">
        <div className="job-info">
          <div className="job-title">
            <h4>{infor.title}</h4>
            <h4>{infor.duration}</h4>
            <h4>{infor.location}</h4>
            <h4>${infor.salary}</h4>

            <h4 className="closing-date">closing date : {expiry}</h4>
          </div>
          <div className="job-description">
            <p>{infor.description}</p>
          </div>
          <div className="vaca-btns">
            <button>Close</button>
            <button className="delete">Delete</button>
          </div>
        </div>
        <div className="employee-info">
          <div className="employee-image">
            <img
              width={"150px"}
              height={"170px"}
              src={infor.employer.profile}
              alt=""
            />
            <h4>{infor.candidates.length} Applied</h4>
          </div>
        </div>
      </div>

      <div className="vaca-navbar-nav">
        <p
          className="nav-h"
          id="skills-nav"
          onClick={(e) => {
            handleNavClick("skills-nav");
          }}
        >
          Skills
        </p>
        <p
          className="nav-h"
          id="req-nav"
          onClick={(e) => {
            handleNavClick("req-nav");
          }}
        >
          Requirements
        </p>
        <p
          className="nav-h"
          id="duties-nav"
          onClick={(e) => {
            handleNavClick("duties-nav");
          }}
        >
          Responsibilities
        </p>
        <p
          className="nav-h"
          id="positions-nav"
          onClick={(e) => {
            handleNavClick("positions-nav");
          }}
        >
          Positions
        </p>
        <p
          className="nav-h"
          id="docs-nav"
          onClick={(e) => {
            handleNavClick("docs-nav");
          }}
        >
          Cover Letter
        </p>
      </div>

      <div className="vaca-navbar-infor">
        <div id="hid" className="vaca-manage-skills">
          <form onSubmit={handleSkillAdded}>
            <h4>Skills required</h4>
            <div className="newskill">
              <input
                value={newskill}
                id="nsk"
                type="text"
                onChange={(event) => setNewSkill(event.target.value)}
                placeholder="add another skill"
              />
            </div>
            <ul className="manage-vaca-skills-list">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="manage-vaca-skill"
                  onClick={handleSkillDeleted}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div id="hid" className="vaca-manage-reqs">
          <form onSubmit={handleReqAdded}>
            <h4>Job Requirements</h4>
            <div className="newskill">
              <input
                value={newreq}
                id="nsk"
                type="text"
                onChange={(event) => setnewreq(event.target.value)}
                placeholder="add another requirement"
              />
            </div>
            <ul className="manage-vaca-skills-list">
              {requirements.map((req) => (
                <li
                  key={req}
                  className="manage-vaca-skill"
                  onClick={handleReqDeleted}
                >
                  {req}
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div id="hid" className="vaca-manage-duties">
          <form onSubmit={handleDutyAdded}>
            <h4>Duties and Responsibilities</h4>
            <div className="newskill">
              <input
                id="nsk"
                type="text"
                value={newduty}
                onChange={(event) => setnewduty(event.target.value)}
                placeholder="add another responsibility"
              />
            </div>
            <ul className="manage-vaca-skills-list">
              {duties.map((duty) => (
                <li
                  key={duty}
                  className="manage-vaca-skill"
                  onClick={handleDutyDeleted}
                >
                  {duty}
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div id="hid" className="vaca-manage-positions">
          <h4>Avaliable Positions</h4>
          <div className="newskill">
            <input
              id="nsk"
              type="number"
              onChange={(event) => setpositions(event.target.value)}
              placeholder="1"
            />
            <button
              disabled={!newskill}
              type="reset"
              onClick={handleUpdate("positions", positions)}
            >
              Save
            </button>
          </div>
          <ul className="manage-vaca-skills-list">
            <h2>{positions} Positions Available</h2>
          </ul>
        </div>
        <div id="hid" className="vaca-manage-docs">
          <h4>Required Documents</h4>
          <div className="newskill">
            <input
              type="checkbox"
              name="cover letter"
              id=""
              onChange={(e) => handleUpdate("cover_letter", e.target.checked)}
              checked={cover_letter}
            />{" "}
            cover letter
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ViewUpdateVacancy() {
  const [vacancy, setVacancy] = useState({});
  const [ownership, setOwnership] = useState(false);

  const vacaid = document.location.pathname.split("/")[2];
  //return console.log(vacaid);
  useEffect(() => {
    //get vacancy data
    axios
      .get(`http://localhost:5000/vaca/${vacaid}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        //console.log(data);
        if (data.vacancy.employer.id === localStorage.getItem("userid"))
          setOwnership(true);
        setVacancy(data.vacancy);
      })
      .catch((err) => console.log("Vacancy error : ", err));
  }, [setVacancy, setOwnership]);

  if (!ownership) {
    //view vacancy as employee

    return (
      <>
        <Navbar />
        <ViewVacancyComonents />
      </>
    );
  } else if (ownership) {
    return (
      //view vacancy as employer
      <>
        <Navbar />
        <VacancyNavbar vacaid={vacancy._id} />
        <EditVacancycomponent infor={vacancy} />
        <div className="view-vaca"></div>
      </>
    );
  }
}
