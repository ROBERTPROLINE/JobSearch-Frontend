export default function VacancyNavbar({ vacaid }) {
  //console.log("vacancy navbar : ", vacaid);
  return (
    <>
      <div className="vaca-navbar">
        <ul className="vaca-navbar-url">
          <li className="nav-item">
            <a href={`/vacancy/${vacaid}`}>Vacancy</a>
          </li>
          <li className="nav-item">
            <a href={`/applicants/${vacaid}`}>Applicants</a>
          </li>
          <li className="nav-item">
            <a href={`/short-listed/${vacaid}`}>shortlisted</a>
          </li>
        </ul>
      </div>
    </>
  );
}
