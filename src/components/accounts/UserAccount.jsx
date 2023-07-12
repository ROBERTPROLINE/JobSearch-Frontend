import Navbar from "../Navbar";
import UserNavbar from "./UserNavbar";
import "../../css/usersett.css";
export default function UserAccount() {
  document.location = "/settings/profile";
  return (
    <>
      <Navbar />
      <UserNavbar />
      <div className="user-settings-info">
        <h2>User Settings </h2>
      </div>
    </>
  );
}
