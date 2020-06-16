import React, { useState } from "react";
import Nav from "../nav";
import AddPatient from "../doctor/addPatient";
import Mypatients from "../doctor/Mypatients";
import Logout from "../logout";
import DoctorListMsg from "./doctorListMsg";

const Doctor = (props) => {
  const [typLi, setTypeLi] = useState("");
  const renderSwitch = (param) => {
    switch (param) {
      case "Add patient":
        return <AddPatient />;

      case `My messages`:
        return <DoctorListMsg />;

      case "My patients":
        return <Mypatients />;

      case "Logout":
        return <Logout />;

      default:
        return "Welcome !";
    }
  };
  return (
    <>
      <Nav setTypeLi={setTypeLi} user={props.user} />
      {renderSwitch(typLi)}
    </>
  );
};

export default Doctor;
