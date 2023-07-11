import Navbar from "../../Navbar";
import UserNavbar from "../UserNavbar";
import pen from "../../../icons/ic_menu_edit.png";
import facebook from "../../../icons/FB.png";
import { useState } from "react";
import axios from "axios";

export default function PersonalInfor() {
  const [image, setImage] = useState();
  const [profilepic, setProfilepic] = useState();

  async function handleChangeImage(e) {
    e.preventDefault();
    console.log(image);
    if (!image || image === "") return;
    setImage(e.target.files[0]);
    setProfilepic("");
    const formData = new FormData();
    formData.append("profileImg", image);
    axios
      .post(`http://localhost:5000/profile_pic/`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          setProfilepic(true);
          //document.location = "/professional_information";
        }, 1000);

        setImage("");
      });
  }
  return (
    <>
      <Navbar />
      <UserNavbar />
      <div className="user-personal-infor">
        <h2>Personal Information</h2>
        <div className="user-account-pic-all">
          <img
            className="user-account-pic"
            src={`http://localhost:5000/profilepicdl/${localStorage.getItem(
              "userid"
            )}`}
            alt=""
            srcset=""
          />

          <img className="pen-image" src={pen} alt="" srcset="" />
        </div>
        <h2>Robert Sibanda (robert)</h2>
        <h3>robertsibanda20@gmail.com</h3>
        <h3>16 Sebanga Park Shurugwi</h3>
        <h3>+263786772147</h3>
        <div className="social-fb">
          <img src={facebook} alt="" />
          <h3>robert sibanda</h3>
        </div>
      </div>
    </>
  );
}
