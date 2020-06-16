import React, { useState } from "react";
import Axios from "axios";
import help from "../../forAll/help";
const { url, auth, id } = help;

const AddSugar = () => {
  const [okMsg, setMsg] = useState("");
  const [sugar, setSugar] = useState("");
  const [withoutAMeal, setithoutAMeal] = useState(false);

  const sendSugar = () => {
    setMsg(false);
    if (sugar !== "null" && sugar > 0) {
      Axios.post(
        `${url}/patient/${id}/sugar/`,
        {
          level: sugar,
          without_a_meal: withoutAMeal,
        },
        {
          headers: auth,
        }
      ).then((res) => {
        setSugar("");
        setithoutAMeal(false);
        setMsg(true);
      });
    } else {
      alert("Wrong values");
    }
  };

  return (
    <div className="add-sugar">
      <br />
      <label htmlFor="level">Sugar level </label>
      <input
        onChange={(e) => setSugar(e.target.value)}
        type="number"
        id="level"
        value={sugar}
      />

      <br />
      <label htmlFor="meal">
        Was it whithout food (fasting blood sugar) ?{" "}
      </label>
      <input
        onChange={(e) => setithoutAMeal(!withoutAMeal)}
        type="checkbox"
        id="meal"
      />
      <br />
      <button onClick={sendSugar}>Send </button>
      <br />
      {okMsg && <h1>Added measurement !</h1>}
    </div>
  );
};

export default AddSugar;
