import Navbar from "./Navbar";
import "../css/about.css";
import { useState } from "react";

export default function About() {
  document.title = "About Robert Sibanda";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleformSubmit(e) {
    e.preventDefault();
    alert(name + " thank you for your message");
  }
  return (
    <div className="About">
      <Navbar />
      <div className="about-tiles">
        <div className="about">
          <h3>Personal</h3>

          <p>
            simple project description with a little bit information about the
            projectsimple project description with a little bit information
            about the projectsimple project description with a little bit
            information about the projectsimple project description with a
            little bit information about the project
          </p>
          <p>
            link to <a href="#">Facebook Profile</a>
          </p>
        </div>

        <div className="about">
          <h3>Interests</h3>

          <p>
            simple project description with a little bit information about the
            projectsimple project description with a little bit information
            about the projectsimple project description with a little bit
            information about the projectsimple project description with a
            little bit information about the projectsimple project description
            with a little bit information about the projectsimple project
            description with a little bit information about the projectsimple
            project description with a little bit information about the
            projectsimple project description with a little bit information
            about the projectsimple
          </p>
          <p>
            link to <a href="#">Facebook Profile</a>
          </p>
        </div>
        <div class="container">
          <form onSubmit={(e) => handleformSubmit(e)}>
            <p>Feel free to send me an email</p>
            <label for="fullname">Fullname</label>
            <input
              class="form-input"
              type="text"
              name="fullname"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label for="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              class="form-input"
              type="email"
              name="email"
              placeholder="user@example.com"
            ></input>
            <label for="">Message</label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              id=""
              cols="30"
              rows="10"
              placeholder="message"
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
