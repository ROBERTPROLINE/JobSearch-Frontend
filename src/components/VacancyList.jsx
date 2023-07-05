import Navbar from "./Navbar";
import "../css/vacancies.css";
import Vacancy from "./Vacancy";
import SelectedVacancy from "./SelectedVacancy";
export default function VacancyList({
  vacancies,
  handleSelectedVacancy,
  selected,
}) {
  return (
    <>
      <SelectedVacancy infor={selected} />

      <div className="vaca-list">
        {vacancies.map((vaca) => (
          <Vacancy
            key={vaca._id}
            infor={vaca}
            handleSelected={handleSelectedVacancy}
          />
        ))}
      </div>
    </>
  );
}
