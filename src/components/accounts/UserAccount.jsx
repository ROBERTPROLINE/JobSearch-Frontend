import Navbar from "../Navbar";
import UserNavbar from "./UserNavbar";

export default function UserAccount() {
  return (
    <>
      <Navbar />
      <UserNavbar />
      <div className="user-infor"></div>
    </>
  );
}
