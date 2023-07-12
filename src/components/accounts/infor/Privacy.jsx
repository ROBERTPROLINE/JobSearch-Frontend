import Navbar from "../../Navbar";
import UserNavbar from "../UserNavbar";
import "../../../css/userpriv.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Privacy() {
  document.title = "Privacy and Security";
  const [pwderror, setError] = useState("");
  const [changed, setChanged] = useState(false);
  const [profile, SetProfile] = useState(0);
  const [contacts, setContacts] = useState(0);
  const [userData, SetUserData] = useState({});

  const [oldpwd, SetOldpwd] = useState("");
  const [newpwd, SetNewpwd] = useState("");

  function UpdateData(e) {
    e.preventDefault();

    console.log("updating : contacts : ", contacts, " profile : ", profile);
    axios
      .patch(
        "http://localhost:5000/users/account/prefs",
        {
          settings: {
            contacts,
            profile,
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
        setChanged(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function UpdatePassword(e) {
    e.preventDefault();
    axios
      .patch(
        "http://localhost:5000/users/account/password",
        {
          old: oldpwd,
          newp: newpwd,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        setChanged(false);
        SetOldpwd("");
        SetNewpwd("");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/account", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        SetUserData(data.account);
        setContacts(data.account.settings.contacts);
        SetProfile(data.account.settings.profile);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [SetUserData]);

  function handleContacts(e) {
    e.preventDefault();
    console.log("contacts : ", e.target.value);
    setContacts(e.target.value);
    console.log(profile, contacts);
    setChanged(true);
  }
  function handleProfile(e) {
    e.preventDefault();
    console.log("profile : ", e.target.value);
    SetProfile(e.target.value);
    console.log(profile, contacts);
    setChanged(true);
  }

  if (!userData) return <></>;
  return (
    <>
      <Navbar />
      <UserNavbar />
      <div className="user-privacy">
        <h2>Privacy and Security Information</h2>
        <div className="user-priv-sec">
          <p>Who can see my profile</p>
          <select name="" id="" onChange={handleProfile} value={profile}>
            <option value="0">Everyone</option>
            <option value="1">Employers</option>
          </select>
        </div>
        <div className="user-priv-sec">
          <p>Who can view my contacts</p>
          <select name="" id="" onChange={handleContacts} value={contacts}>
            <option value="0">Everyone</option>
            <option value="1">Employers</option>
          </select>
        </div>
        <button
          className="update-btn2"
          hidden={!changed}
          onClick={(e) => UpdateData(e)}
          type="reset">
          Save
        </button>
        <h2>Change Password</h2>
        <div className="user-priv-sec-pwd">
          <p>Old Password</p>
          <input
            type="password"
            name=""
            value={oldpwd}
            onChange={(e) => SetOldpwd(e.target.value)}
          />
          <p>New Password</p>
          <input
            type="password"
            name=""
            value={newpwd}
            onChange={(e) => SetNewpwd(e.target.value)}
          />

          <button
            disabled={oldpwd.length < 4 || newpwd.length < 4}
            onClick={(e) => UpdatePassword(e)}
            type="reset">
            Update
          </button>
        </div>
      </div>
    </>
  );
}
