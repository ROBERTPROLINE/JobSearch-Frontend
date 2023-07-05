const classList = {
  Skills: "vaca-manage-skills",
  Requirements: "vaca-manage-reqs",
  Responsibilities: "vaca-manage-duties",
  Positions: "vaca-manage-positions",
};

classList.forEach((element) => {
  console.log(element);
});

if (element.innerHTML === "Skills") {
  const toView = document.getElementsByClassName("vaca-manage-skills").item(0);
  console.log(toView);
  toView.removeAttribute("id");
  console.log("To View : ", toView);

  classList.forEach((cls) => {
    console.log("class : ", cls);

    if (cls === classListObjects[element.innerHTML])
      return console.log("viewing me : ", cls);
    console.log("not viewing me : ", cls);
    const toHide = document.getElementsByClassName(cls).item(0);
    console.log("To Hide : ", toHide);
    return toHide.setAttribute("id", "hid");
  });
} else if (element.innerHTML === "Requirements") {
}

/////////////////////
<>
  <div className="cs-vaca-infor">
    <h1>{infor.title}</h1>
    <h2>Posted By : {infor.employer.name}</h2>
    <h4>{infor.description}</h4>
    <h4>@ {infor.location}</h4>
    <h4>$ {infor.salary}</h4>
    <h4>{infor.duration}</h4>
  </div>

  <div className="cs-vaca-infor-cards">
    <div className="cs-vaca-infor-cards-resp">
      <ul>
        {duties.map((duty) => {
          <li>duty</li>;
        })}
      </ul>
    </div>
    <div className="cs-vaca-infor-cards-req">
      <ul>
        {requirements.map((req) => {
          <li>req</li>;
        })}
      </ul>
    </div>
    <div className="cs-vaca-infor-cards-skills">
      <ul>
        {skills.map((skill) => {
          <li>skill</li>;
        })}
      </ul>
    </div>
  </div>

  <div className="cover-letter" disabled={!coverReq}>
    <textarea name="" id="" cols="60" rows="10"></textarea>
  </div>
</>;
