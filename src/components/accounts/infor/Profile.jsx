import Navbar from "../../Navbar";
import UserNavbar from "../UserNavbar";
import pen from "../../../icons/ic_menu_edit.png";
import facebook from "../../../icons/FB.png";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/userpers.css";

export default function PersonalInfor() {
  document.title = "Personal Information";
  const [image, setImage] = useState();
  const [profilepic, setProfilepic] = useState();
  const [clicked, SetClicked] = useState(false);
  const [selectedImage, SetSelectedImage] = useState("");
  const [email, SetEmail] = useState("");
  const [fullname, SetFullname] = useState("");
  const [address, SetAddress] = useState("");
  const [phone, SetPhone] = useState("");

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
        SetFullname(data.account.fullname);
        SetEmail(data.account.email);
        SetAddress(data.account.address);
        SetPhone(data.account.phone);
      })
      .catch((err) => {
        const error = err.data.error;
        alert(error);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleChangeImage(img) {
    const formData = new FormData();
    formData.append("profileImg", img);
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

  function SaveDetails(e) {
    e.preventDefault();
    axios
      .patch(
        "http://localhost:5000/users/account/prefs",
        {
          email,
          fullname,
          address,
          phone,
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
        console.log(err.response.data);
      });
  }

  function SelectImage(file) {
    console.log("Selected image", file);
    //SetSelectedImage(new file());
    handleChangeImage(file);
    SetClicked(true);
  }
  return (
    <>
      <Navbar />
      <UserNavbar />
      <div className="user-personal-infor">
        <h2>Personal Information</h2>

        <div className="user-account-pic-all">
          <div className="user-pic">
            <input
              className="user-pic-update"
              hidden={!clicked}
              type="file"
              name=""
              id=""
              onChange={(e) => SelectImage(e.target.files[0])}
            />{" "}
            <img
              className="user-account-pic"
              src={`http://localhost:5000/profilepicdl/${localStorage.getItem(
                "userid"
              )}`}
              alt=""
            />
          </div>
          <img
            className="pen-image"
            src={pen}
            alt=""
            onClick={(e) => SetClicked(!clicked)}
          />
        </div>
        <h2>
          <input
            type="text"
            value={fullname}
            name=""
            defaultValue="Robert Sibanda "
            onChange={(e) => SetFullname(e.target.value)}
            id=""
          />
        </h2>

        <h3>
          <input
            type="mail"
            defaultValue={"robertsibanda20@gmail.com"}
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />
        </h3>
        <h3>
          <input
            type="text"
            value={address}
            defaultValue={"16 Sebanga Park Shurugwi"}
            onChange={(e) => SetAddress(e.target.value)}
          />
        </h3>
        <h3>
          <input
            type="text"
            value={phone}
            defaultValue={"+263786772147"}
            onChange={(e) => SetPhone(e.target.value)}
          />
        </h3>
        <div className="social-fb">
          <img src={facebook} alt="" />
          <h3>robert sibanda</h3>
        </div>

        <button onClick={SaveDetails} className="update-profile-btn">
          Save
        </button>
      </div>
    </>
  );
}
