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
      case "Dodaj pacjeta":
        return <AddPatient />;

      case `Moje wiadomośći`:
        return <DoctorListMsg />;

      case "Moi pacjenci":
        return <Mypatients />;

      case "Wyloguj":
        return <Logout />;

      default:
        return "Witam ";
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
