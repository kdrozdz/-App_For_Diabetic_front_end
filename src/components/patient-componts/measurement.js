import React from "react";

const Measurement = ({ level, date, without_a_meal }) => {
  const Newdate = new Date(date);

  const year = Newdate.getFullYear();
  const month = Newdate.getMonth();
  const day = Newdate.getDay();

  const hours = Newdate.getHours();
  const min = Newdate.getMinutes();

  const time = `Czas: ${hours}:${min} `;
  const dateToDisp = ` Data: ${day}-${month + 1}-${year}`;
  return (
    <li>
      <p className="sugar-level">
        Level: {level} Fasting blood sugar: {without_a_meal ? "Yes" : "No"}
        <br />
        {time}
        {dateToDisp} <br />
      </p>
    </li>
  );
};

export default Measurement;
