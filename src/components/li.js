import React, { useState, useEffect } from "react";
import help from "../forAll/help";
import Axios from "axios";

const { id, url, auth } = help;
const get_new_msg = (rId, setNewMsg) => {
  Axios.post(
    `${url}/email/new_msg/`,
    {
      rId,
    },
    {
      headers: auth,
    }
  ).then((res) => {
    setNewMsg(res.data.length);
  });
};

const Li = (props) => {
  const [new_msg, setNewMsg] = useState(0);
  const name = props.name;
  const change = () => {
    props.change(name);
  };
  useEffect(() => {
    get_new_msg(id, setNewMsg);
  }, []);

  get_new_msg(id, setNewMsg);
  return (
    <>
      <li onClick={change}>
        {props.name}{" "}
        {props.name === "Moje wiadomośći" ? `Nowe: ${new_msg}` : null}
      </li>
    </>
  );
};

export default Li;
