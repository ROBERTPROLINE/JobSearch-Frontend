import React, { useEffect, useState } from "react";
import ViewUpdateVacancy from "./ViewUpdateVacancy";
import { render } from "@testing-library/react";
import { renderIntoDocument } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";

export default function SelectedVacancy({ infor, handleClickView }) {
  let [expiry, setExpiry] = useState("");
  let userid = localStorage.getItem("userid");
  const [applied, setApplied] = useState(false);

  let vaca;
  try {
    vaca = infor[0] || infor;
  } catch {
    return <></>;
  }

  if (!vaca.title) {
    return <></>;
  }

  const nd = new Date(vaca.closingDate).toDateString();

  expiry = nd;
  console.log("selected vacancy : ", expiry);

  function loadVacancy() {
    document.location = `/vacancy/${vaca._id}`;
  }

  return (
    <div className="selected-vaca">
      <div className="selected-job-info">
        <div className="selected-job-title">
          <h3>{vaca.title}</h3>
          <h4>{vaca.duration}</h4>
          <h4>{vaca.location}</h4>
          <h4>${vaca.salary}</h4>

          <h4 className="closing-date">closing date : {expiry}</h4>
        </div>
        <div className="job-description">
          <p>{vaca.description}</p>
        </div>

        <div className="job-add-info">
          <p>{vaca.candidates.length} applied</p>
          <p>{vaca.hired} hired</p>
        </div>
        <button
          hidden={
            userid === vaca.employer.id ||
            vaca.candidates.indexOf(localStorage.getItem("userid")) !== -1
          }
          onClick={loadVacancy}
        >
          Apply For Job
        </button>
        <button
          hidden={
            vaca.candidates.indexOf(localStorage.getItem("userid")) === -1
          }
          onClick={loadVacancy}
        >
          View Application
        </button>
        <button hidden={userid !== vaca.employer.id} onClick={loadVacancy}>
          View & Update
        </button>
      </div>

      <div className="selected-job-employee-info">
        <div className="employee-image">
          <img
            width={"150px"}
            height={"170px"}
            src={vaca.employer.profile}
            alt=""
          />
        </div>
        <div className="employee-details">
          <a href="#" hidden={userid === vaca.employer.id}>
            Visit {vaca.employer.name} Profile
          </a>
          <a href="#" hidden={userid === vaca.employer.id}>
            Jobs by {vaca.employer.name}
          </a>
        </div>

        <div
          hidden={userid === vaca.employer.id}
          className="selected-employee-add-info"
        >
          <a href="#">Visit Profile</a>
          <a href="#"> Company Website</a>
        </div>
      </div>
    </div>
  );
}
