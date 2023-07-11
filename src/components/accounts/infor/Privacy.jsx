import Navbar from "../../Navbar";
import UserNavbar from "../UserNavbar";
import "../../../css/userpriv.css";
import { useState } from "react";

export default function Privacy() {
  const [pwderror, setError] = useState("");
  const [failure, setFailure] = useState(false);
  document.title = "Privacy and Security";
  return (
    <>
      <Navbar />
      <UserNavbar />
      <div className="user-privacy">
        <h2>Privacy and Security Information</h2>
        <div className="user-priv-sec">
          <p>Who can see my profile</p>
          <select name="" id="">
            <option value="">Everyone</option>
            <option value="">Employers</option>
          </select>
        </div>
        <div className="user-priv-sec">
          <p>Who can view my contacts</p>
          <select name="" id="">
            <option value="">Everyone</option>
            <option value="">Employers</option>
          </select>
        </div>
        <h2>Change Password</h2>
        <div className="user-priv-sec-pwd">
          <p>Old Password</p>
          <input type="password" name="" id="" />
          <p>New Password</p>
          <input type="password" name="" id="" />
          <p hidden={!failure} className="eror">
            {pwderror}
          </p>
          <button type="reset">Save</button>
        </div>
      </div>
    </>
  );
}
