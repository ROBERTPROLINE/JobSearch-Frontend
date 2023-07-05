import "../css/navbar.css";

export default function Navbar({ handleSearch }) {
  return (
    <div className="nav-blank">
      <div className="navbar-nav">
        <div className="nav-item-home"></div>
        <div className="pheadings">
          <ul className="navbar-url">
            <li className="nav-item">
              <a href={"/"}>Home</a>
            </li>
            <li className="nav-item">
              <a href="/vacancies/">Vacancies</a>
            </li>
            <li className="nav-item">
              <a href="/applications/">Applications</a>
            </li>
            <li className="nav-item">
              <a href="/create-vacancy/">Create Job</a>
            </li>
          </ul>
        </div>
        <div className="searchbar">
          <input
            className="product-search"
            type="search"
            placeholder="        search work"
            id="prsearch"
            disabled={document.location.pathname !== "/"}
            onChange={handleSearch}
          />
        </div>

        <div className="profile-info">
          <img
            className="profilepic"
            width={"50px"}
            height={"45px"}
            src={`http://localhost:5000/profilepicdl/${localStorage.getItem(
              "userid"
            )}`}
            alt=""
          />
          <p className="profile-name">{localStorage.getItem("fullname")}</p>
          <div className="logout">
            <button
              className="lgbtn"
              onClick={(e) => (document.location = "/login")}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
