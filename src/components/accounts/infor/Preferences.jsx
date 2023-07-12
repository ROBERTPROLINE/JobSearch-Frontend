//user preferences

import Navbar from "../../Navbar";
import UserNavbar from "../UserNavbar";
import "../../../css/userpref.css";
import { useEffect, useState } from "react";
import axios from "axios";
//select to recieve new job alerts in mailbox
//select to receive news in inbox

export default function Preferences() {
  document.title = "User Preferences";

  const [applications, SetApplications] = useState(false);
  const [jobs, SetJobs] = useState(false);
  const [vacancies, SetVacancies] = useState(false);

  function UpdateData(e) {
    e.preventDefault();
    axios
      .patch(
        "http://localhost:5000/users/account/prefs",
        {
          settings: {
            prefs: {
              applications,
              jobs,
              vacancies,
            },
          },
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
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
        SetJobs(data.account.settings.prefs.jobs);
        SetVacancies(data.account.settings.prefs.vacancies);
        SetApplications(data.account.settings.prefs.applications);
      })
      .catch((err) => {
        const error = err.data.error;
        alert(error);
      });
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Navbar />
      <UserNavbar />
      <div className="user-preferences">
        <h2>User Preferences</h2>
        <div className="info-container-input-pref">
          <input
            type="checkbox"
            name=""
            id=""
            checked={jobs}
            onChange={(e) => SetJobs(e.target.checked)}
          />
          <p>Receive email updates for jobs matching your account</p>
        </div>
        <div className="info-container-input-pref">
          <input
            type="checkbox"
            name=""
            id=""
            checked={vacancies}
            onChange={(e) => SetVacancies(e.target.checked)}
          />
          <p>Receive email updates for your vacancies` activity </p>
        </div>
        <div className="info-container-input-pref">
          <input
            type="checkbox"
            name=""
            id=""
            checked={applications}
            onChange={(e) => SetApplications(e.target.checked)}
          />
          <p>Receive email updates for vacancies you have applied to</p>
        </div>

        <button onClick={(e) => UpdateData(e)} className="update-btn">
          Update
        </button>
      </div>
    </>
  );
}
