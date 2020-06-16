import React from "react";
import Msg from "./msg";

const conversation = ({ currentPosts, SecondUserMsg }) => {
  return (
    <ul className="conv">
      {currentPosts.map((item) => (
        <Msg
          patientId
          key={item.id}
          item={item}
          SecondUserMsg={SecondUserMsg}
        />
      ))}
    </ul>
  );
};

export default conversation;
