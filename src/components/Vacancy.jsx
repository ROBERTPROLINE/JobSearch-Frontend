import { useEffect, useState } from "react";

export default function Vacancy({ infor, handleSelected }) {
  let [expiry, setExpiry] = useState("");
  const nd = new Date(infor.closingDate).toDateString();
  expiry = nd;
  return (
    <>
      <div className="vaca-info" onMouseOver={(e) => handleSelected(infor._id)}>
        <div className="job-info">
          <div className="job-title">
            <h3>{infor.title}</h3>
            <h4>{infor.duration}</h4>
            <h4>{infor.location}</h4>
            <h4>${infor.salary}</h4>

            <h4 className="closing-date">closing date : {expiry}</h4>
          </div>
          <div className="job-description">
            <p>{infor.description}</p>
          </div>
          <button onClick={(e) => handleSelected(infor._id)}>View Job</button>
        </div>
        <div className="employee-info">
          <div className="employee-image">
            <img
              width={"150px"}
              height={"170px"}
              src={infor.employer.profile}
              alt=""
            />
          </div>
          <div className="employee-details">
            <a href="#">{infor.employer.name}</a>
            <p>{infor.employer.address}</p>
          </div>
        </div>
      </div>
    </>
  );
}
