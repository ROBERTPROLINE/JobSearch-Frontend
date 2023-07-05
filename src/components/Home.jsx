import Navbar from "./Navbar";
import Login from "./Login";
import VacancyList from "./VacancyList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  document.title = "Job Center";
  const [vacancies, setVacancies] = useState([]);
  const [selected, setSelected] = useState({});
  function loadData() {}

  useEffect(() => {
    if (!localStorage.getItem("access")) {
      return (document.location = "/login");
    }
    axios
      .get("http://localhost:5000/vaca", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((resp) => resp.data)
      .then((data) => {
        console.log("vacancies :", data.vacancies);
        setVacancies(data.vacancies);
        setSelected(data.vacancies[0]);
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST")
          return (document.location = "/login");
        console.log("Error : ", err.code);
      });
  }, [setVacancies, setSelected]);

  function handleClickedVacancy(id) {
    //console.log(`searching for ${text}`)

    setSelected(
      vacancies.filter((vaca) => {
        if (vaca._id === id) {
          return vaca;
        }
      })
    );
  }

  if (!localStorage.getItem("access")) {
    return <Login />;
  } else {
    return (
      //document.title = ""
      <>
        <Navbar />

        <div className="Home">
          <VacancyList
            selected={selected}
            vacancies={vacancies}
            handleSelectedVacancy={handleClickedVacancy}
          />
        </div>
      </>
    );
  }
}
