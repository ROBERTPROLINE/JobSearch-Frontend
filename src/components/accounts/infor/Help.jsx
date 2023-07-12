import { useState } from "react";
import Navbar from "../../Navbar";
import UserNavbar from "../UserNavbar";
import axios from "axios";
export default function Help() {
  document.title = "Settings - Help";

  const [message, SetMessage] = useState("");
  function sendHelp(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/help",
        {
          message,
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
        SetMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Navbar />
      <UserNavbar />
      <div className="user-help-settings">
        <h2>Facing challenges with you settings ? </h2>
        <h2>Tell us ....</h2>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => SetMessage(e.target.value)}
          placeholder="I am having trouble with ..."></textarea>
        <button onClick={sendHelp} className="update-btn">
          Submit
        </button>
      </div>
    </>
  );
}
