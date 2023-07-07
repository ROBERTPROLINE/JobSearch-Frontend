import profile from "../../profile.png";

export default function SingleApp({ infor, handleclick }) {
  console.log("single app : ", infor);

  if (!infor) {
    return <></>;
  }
  return (
    <>
      <div className="applicant-profile">
        <img
          width={"110px"}
          height={"90px"}
          src={`http://localhost:5000/profilepicdl/${infor.user._id}`}
          alt=""
        />
        <p>{infor.user.fullname}</p>
        <p>{infor.user.email}</p>
        <p>
          {infor.user.experience} years experienced {infor.user.profession}
        </p>
        <button
          className="good"
          onClick={(e) => handleclick(e, infor.appl, infor.user)}>
          View
        </button>
      </div>
    </>
  );
}
