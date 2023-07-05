import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PostVacancy from "./components/PostVacancy";
import ViewUpdateVacancy from "./components/ViewUpdateVacancy";
import MyApplications from "./components/MyApplications";
import ManageApplications from "./components/manage/Applications";
import ManageShortListed from "./components/manage/ShortListed";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
