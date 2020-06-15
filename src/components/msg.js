import React, { useState } from "react";
import help from "../forAll/help";
import Axios from "axios";

const { id, url, auth, getMsg } = help;

const Msg = ({ item }) => {
  const [isNew, SetIsnew] = useState(!item.is_new);

  const Newdate = new Date(item.create_time);

  const year = Newdate.getFullYear();
  const month = Newdate.getMonth();
  const day = Newdate.getDay();

  const hours = Newdate.getHours();
  const min = Newdate.getMinutes();

  const time = `Czas: ${hours}:${min} `;
  const dateToDisp = ` Data: ${day}-${month + 1}-${year}`;

  return (
    <li className={+item.sender === +id ? "conv-li" : "conv-li-rev"}>
      <span className={+item.sender === +id ? "my" : "other"}>
        {+item.sender === +id ? "Ja" : "Odbiorca"}
      </span>
      <span className="patient-doctor-msg">{item.msg}</span>
      <span className="patient-doctor-create">
        {time} <br /> {dateToDisp}
      </span>
      {+item.reciver === +id ? (
        <span className="patient-doctor-is_new">
          Przeczytałem
          <input
            type="checkbox"
            value={isNew}
            checked={isNew}
            onChange={() => {
              SetIsnew(!isNew);
              Axios.put(
                `${url}/email/${item.id}/`,
                {
                  is_new: isNew,
                },
                {
                  headers: auth,
                }
              )
                .then((res) => getMsg(item.sender, item.reciver))
                .catch((err) => alert(err));
            }}
          />
        </span>
      ) : null}
    </li>
  );
};

export default Msg;
