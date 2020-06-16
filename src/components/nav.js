import React from "react";
import Li from "./li";

const Nav = (props) => {
  const change = (item) => {
    props.setTypeLi(item);
  };

  const opitons = props.user
    ? ["Add patient", "My patients", `My messages`, "Logout"]
    : ["Add sugar", "My sugars", "My messages", "Logout"];

  return (
    <>
      <nav className="menu">
        <ul>
          {opitons.map((item) => {
            return <Li key={item} name={item} change={change} />;
          })}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
