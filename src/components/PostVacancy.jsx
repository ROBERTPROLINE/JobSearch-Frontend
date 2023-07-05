import { useEffect, useState } from "react";
import "../css/postvaca.css";
import "../css/vacancies.css";

import axios from "axios";
import Navbar from "./Navbar";
export default function PostVacancy({ infor }) {
  document.title = "post a job";

  const [title, setTitle] = useState("");
  let [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [closing, setClosing] = useState("");
  const [candidates, setCandidates] = useState("");
  const [blockValue, setBlockValue] = useState("");
  const [blockC, setBlock] = useState("");
  const [fullTime, setFulltime] = useState(false);

  function handleFullTime(e) {
    setFulltime(e.target.checked);
    if (!e.target.checked) {
      return handleDuration(e);
    }
    setDuration("Full Time");
  }

  function handleDuration(e) {
    const drval = document.getElementById("block").value;
    const drblock = document.getElementById("bv").value;
    setDuration(`${drval} ${drblock}`);
  }

  function handleSaveJob(e) {
    e.preventDefault();
    if (!title || !location || !duration || !salary || !description)
      return console.log("information missing");

    if (!category) category = document.getElementById("category").value;
    //return console.log(category);
    axios
      .post(
        "http://localhost:5000/vaca",
        {
          title,
          location,
          duration,
          industry: category,
          salary,
          description,
          closingDate: closing,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((data) => {
        if (data.data.error) return console.log(data.data.error);
        alert(data.data.success);
        const vacancy = data.data.vaca;
        document.location = `http://localhost:3000/vacancy/${vacancy._id}`;
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Navbar />
      <div className="post-vacancies">
        <div className="post-data">
          <div className="section">
            <p>Job title</p>
            <input
              type="text"
              name="title"
              id=""
              placeholder="Backed Developer"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="section">
            <p>Industry</p>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Data Science">Data Science</option>
              <option value="Home">Home</option>
              <option value="Health">Health</option>
              <option value="Office Work">Office Work</option>
            </select>
          </div>
          <div className="section">
            <p>Location</p>
            <input
              type="text"
              name="location"
              id=""
              placeholder="location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="section">
            <p>Salary</p>
            <input
              type="text"
              name=""
              id=""
              placeholder="$500 per month"
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div className="section">
            <p>Description</p>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              value={description}
              placeholder="description"
              maxLength={150}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <p className="section2">Duration of work</p>
          <div className="section2">
            FullTime:
            <input type="checkbox" name="" id="" onChange={handleFullTime} />
          </div>

          <div className="section">
            <p hidden={fullTime}>Specific:</p>
            <input
              type="number"
              name="duration"
              id="block"
              placeholder={6}
              hidden={fullTime}
              onChange={handleDuration}
            />
            <select name="" id="bv" hidden={fullTime} onChange={handleDuration}>
              <option value="months">months</option>
              <option value="years">years</option>
              <option value="days">days</option>
            </select>
          </div>

          <div className="section">
            <p>Closing Date</p>
            <input
              type="date"
              name="closing-date"
              id=""
              onChange={(e) => setClosing(e.target.value)}
            />
          </div>
        </div>

        <div className="selected-vaca">
          <div className="selected-job-info">
            <div className="selected-job-title">
              <h3>{title}</h3>
              <h4>{duration}</h4>
              <h4>{location}</h4>
              <h4>${salary}</h4>

              <h4 className="closing-date">closing date : {closing} </h4>
            </div>
            <div className="job-description">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={description}
              ></textarea>
            </div>

            <button onClick={handleSaveJob}>Save Job</button>
          </div>
        </div>
      </div>
    </>
  );
}
