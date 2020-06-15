import React, { useState, useEffect } from "react";
import Nav from "../nav";
import AddSugar from "./add-sugar";
import MySugar from "./my-sugar";
import Logout from "../logout";
import Email from "./email";
import Axios from "axios";
import help from "../../forAll/help";

const { url, id, auth } = help;

const Patient = () => {
  const [typLi, setTypeLi] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get(`${url}/patient/${id}/`, {
      headers: auth,
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((res) => {});
  }, []);

  const renderSwitch = (param) => {
    switch (param) {
      case "Dodaj cukier":
        return <AddSugar />;

      case "Moje wiadomośći":
        if (user.doctor) {
          return <Email />;
        } else {
          return "Jeszcze nie masz przypisanego lekarza";
        }

      case "Mój cukeri":
        return <MySugar />;

      case "Wyloguj":
        return <Logout />;

      default:
        return `Witaj pacjencie `;
    }
  };
  return (
    <>
      <Nav setTypeLi={setTypeLi} />
      {renderSwitch(typLi)}
    </>
  );
};

export default Patient;
