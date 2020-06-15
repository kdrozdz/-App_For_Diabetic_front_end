import React from "react";
import Li from "./li";

const Nav = (props) => {
  const change = (item) => {
    props.setTypeLi(item);
  };

  const opitons = props.user
    ? ["Dodaj pacjeta", "Moi pacjenci", `Moje wiadomośći`, "Wyloguj"]
    : ["Dodaj cukier", "Mój cukeri", "Moje wiadomośći", "Wyloguj"];

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
