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
      case "Add sugar":
        return <AddSugar />;

      case "My messages":
        if (user.doctor) {
          return <Email />;
        } else {
          return "You don't have a doctor yet";
        }

      case "My sugars":
        return <MySugar />;

      case "Logout":
        return <Logout />;

      default:
        return `Welcome patient `;
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
