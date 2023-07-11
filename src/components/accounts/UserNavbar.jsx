import profile from "../../icons/profile.png";
import settings from "../../icons/settings.png";
import infor from "../../icons/ic_dialog_info.png";
import "../../css/usernav.css";
export default function UserNavbar() {
  return (
    <>
      <div className="user-nav">
        <a href="/settings/profile">
          <div className="user-nav-sec">
            <img src={profile} alt="" />
            <p>Personal Information</p>
          </div>
        </a>
        <a href="/settings/professional">
          <div className="user-nav-sec" id="nav-prof">
            <img src="" alt="" />
            <p>Professional Information</p>
          </div>
        </a>

        <a href="">
          <div className="user-nav-sec">
            <img src={infor} alt="" />
            <p>Preferences</p>
          </div>
        </a>
        <a href="/settings/privacy">
          <div className="user-nav-sec">
            <img src={settings} alt="" />
            <p>Privacy and Security Settings</p>
          </div>
        </a>
        <a href="/settings/help">
          <div className="user-nav-sec">
            <img src="" alt="" />
            <p>Help</p>
          </div>
        </a>
      </div>
    </>
  );
}
