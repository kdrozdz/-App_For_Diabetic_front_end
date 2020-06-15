import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Patient from "./components/patient-componts/patient";
import Doctor from "./components/doctor/doctor";
import help from "./forAll/help";

const { url, auth, id } = help;

function App() {
  const [user, setUser] = useState({});

  useEffect((e) => {
    Axios.get(`${url}/users/${id}/`, {
      headers: auth,
    }).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div className="App">{user.is_staff ? <Doctor user /> : <Patient />}</div>
  );
}

export default App;
