import React, { useState, useEffect } from "react";
import Axios from "axios";
import BtnAction from "./btnAction";
import help from "../../forAll/help";
const { url, id, auth } = help;

const AddPatient = () => {
  const [patientList, setPatientList] = useState([]);

  const getList = () => {
    Axios.get(
      `${url}/patient/`,
      {
        headers: auth,
      },
      []
    ).then((res) => setPatientList(res.data));
  };

  const addPatient = (patient_pk, doctor_pk) => {
    Axios.post(
      `${url}/doctors/${doctor_pk}/add_patient/`,
      {
        patient_pk,
      },
      {
        headers: auth,
      }
    )
      .then((res) => getList())
      .catch((res) => alert("Error!"));
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <ul>
        {patientList.map((item) => (
          <BtnAction
            key={item.user.id}
            patient={item}
            doctor={id}
            action={addPatient}
            add
          />
        ))}
      </ul>
    </div>
  );
};

export default AddPatient;
