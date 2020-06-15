import React from "react";
const BtnAction = ({
  patient,
  doctor,
  action,
  actionSecond,
  add,
  detail,
  msg,
  take_user_name,
  length_new_msg,
}) => {
  return (
    <li>
      <span>{patient.user.username}</span>
      <button
        onClick={() => {
          action(patient.user.id, doctor);
          take_user_name && take_user_name(patient.user.username);
        }}
      >
        {add && "Dodaj"}
        {detail && "Szczegóły"}
        {msg && "Wiadomości"}
      </button>
      {/* second bt */}
      {actionSecond && (
        <button
          onClick={() => {
            actionSecond(patient.user.id);
          }}
        >
          Usuni
        </button>
      )}
      {/* {info_of_msg} */}
      {length_new_msg}
    </li>
  );
};

export default BtnAction;
