import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Vacancies from "./components/Vacancies";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PostVacancy from "./components/PostVacancy";
import ViewUpdateVacancy from "./components/ViewUpdateVacancy";
import MyApplications from "./components/MyApplications";
import ManageApplications from "./components/manage/Applications";
import ManageShortListed from "./components/manage/ShortListed";
import UserAccount from "./components/accounts/UserAccount";
import PersonalInfor from "./components/accounts/infor/Profile";
import Professional from "./components/accounts/infor/Professional";
import Privacy from "./components/accounts/infor/Privacy";
import Preferences from "./components/accounts/infor/Preferences";
import Help from "./components/accounts/infor/Help";
import NotFound from "./components/404";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<Signup />} />
          <Route
            path="/personal-information"
            element={<Signup level={"personal"} />}
          />
          <Route
            path="/professional-information"
            element={<Signup level={"professional"} />}
          />
          <Route path="/create-vacancy" element={<PostVacancy infor={{}} />} />
          <Route path="/applications/" element={<MyApplications />} />
          <Route path="/vacancy/:id" element={<ViewUpdateVacancy />} />
          <Route path="/short-listed/:id" element={<ManageShortListed />} />
          <Route path="/applicants/:id" element={<ManageApplications />} />
          <Route path="/settings/" element={<UserAccount />} />
          <Route path="/settings/profile" element={<PersonalInfor />} />
          <Route path="/settings/professional" element={<Professional />} />
          <Route path="/settings/privacy" element={<Privacy />} />
          <Route path="/settings/preferences" element={<Preferences />} />
          <Route path="/settings/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
