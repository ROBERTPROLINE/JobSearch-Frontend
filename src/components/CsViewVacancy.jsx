import { useEffect, useState } from "react";
import axios from "axios";
export default function ViewVacancyComonents() {
  const vacaid = document.location.pathname.split("/")[2];

  const [coverReq, setCoverReq] = useState(false);
  const [skills, Setskills] = useState([]);
  const [duties, setDuties] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [status, setStatus] = useState("");
  const [infor, setInfor] = useState({});
  const [employer, setEmployer] = useState("");
  const [cover_letter, setCoverLetter] = useState("");
  const [applied, setApplied] = useState(false);
  const [application, setApplication] = useState(false);

  function DeleteApplication() {}
  function SubmitApplication(e) {
    e.preventDefault();
    let data = {};
    if (coverReq) {
      data = {
        vacancy: infor._id,
        cover_letter,
      };
    } else {
      data = {
        vacancy: infor._id,
      };
    }
    axios
      .post(`http://localhost:5000/app`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        //console.log(data);
        return setApplied(true);
      })
      .catch((er) => {
        console.log(er.response.data);
      });
  }

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
        //console.log("Vacancy data : ", data);

        setCoverReq(data.vacancy.cover_letter);
        setInfor(data.vacancy);
        setEmployer(data.vacancy.employer.name);
        setRequirements(data.vacancy.requirements);
        Setskills(data.vacancy.skills);
        setDuties(data.vacancy.duties_and_responsibilities);
        //console.log(data.vacancy.candidates);

        setApplied(
          data.vacancy.candidates.indexOf(localStorage.getItem("userid")) !== -1
        );

        //console.log("cover req : ", coverReq);
        //console.log("applied : ", applied);

        if (applied & coverReq) {
          axios
            .get(`http://localhost:5000/app/${infor._id}`, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            })
            .then((response) => response.data)
            .then((data) => {
              console.log("Application : ", data);
              setApplication(data.application);
              //setStatus(data.application.status);
              //setCoverLetter(data.application.cover_letter);
            });
        }
      })
      .catch((err) => console.log("Vacancy error : ", err));
  }, [setInfor, coverReq]);

  // console.log(duties);

  return (
    <>
      <div className="cs-vaca-infor">
        <h2 className={application.status} hidden={!applied}>
          Application Status : {application.status}
        </h2>
        <h1>{infor.title}</h1>

        <h4>{infor.description}</h4>
        <h4>@ {infor.location}</h4>
        <h4>$ {infor.salary}</h4>
        <h4>{infor.duration}</h4>
      </div>

      <div className="cs-vaca-infor-cards">
        <div className="cs-vaca-infor-card">
          <h3>Duties and Responsibilities</h3>
          <ul>
            {duties.map((duty) => (
              <li key={duty}>{duty}</li>
            ))}
          </ul>
        </div>
        <div className="cs-vaca-infor-card">
          <h3>Job Requirements</h3>
          <ul>
            {requirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>
        <div className="cs-vaca-infor-card">
          <h3>Skills Necessary</h3>
          <ul>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="cover-letter">
        <h4 hidden={!infor.cover_letter || applied}>
          Cover Letter is required
        </h4>
        <textarea
          name=""
          id=""
          cols="60"
          rows="10"
          hidden={!infor.cover_letter}
          disabled={applied}
          onChange={(e) => setCoverLetter(e.target.value)}
          value={cover_letter}
        ></textarea>
      </div>

      <button hidden={applied} onClick={SubmitApplication} className="sb">
        Submit Application
      </button>
      <button hidden={!applied} onClick={DeleteApplication} className="sb">
        Delete Application
      </button>
    </>
  );
}
