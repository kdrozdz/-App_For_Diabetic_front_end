import React, { useState, useEffect } from "react";
import Axios from "axios";
import help from "../../forAll/help";
import Pagination from "../pagination";
import Conversation from "../conversation";

const { id, url, auth, sendMsg } = help;

const Email = () => {
  const [doctorUserId, setDoctor] = useState("");
  const [msg, setMsg] = useState("");

  const [allMsg, setAllMsg] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [userName, setUserName] = useState("");
  const [SecondUserMsg, setSecondUserMsg] = useState("");
  const getMsg = (sId, rId) => {
    Axios.post(
      `${url}/email/conv/`,
      {
        sId,
        rId,
      },
      {
        headers: auth,
      }
    ).then((res) => {
      setAllMsg(res.data);
    });
  };

  useEffect(() => {
    Axios.get(`${url}/patient/${id}/`, {
      headers: auth,
    }).then((res) => {
      getMsg(id, res.data.doctor.user.id);
      setDoctor(res.data.doctor.user.id);

      setSecondUserMsg(res.data.doctor.user.id);

      setUserName(res.data.doctor.user);
    });
  }, []);
  const all_msg_rev = [];

  Object.keys({ ...allMsg }).forEach((key) => {
    all_msg_rev.push({ ...allMsg[key] });
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = all_msg_rev.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const li = document.body.querySelectorAll(".paginate-li");
    li.forEach((item) => {
      item.classList.remove("active");
    });
    li[pageNumber - 1].classList.add("active");
  };

  return (
    <div className="msg">
      <label htmlFor="msg">
        Wiadmość do{" "}
        {userName.is_staff ? `Lekarz ${userName.username}` : "pacjent"}
      </label>
      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        name=""
        id="msg"
        rows="5"
      ></textarea>
      <button
        onClick={() => {
          sendMsg(id, doctorUserId, msg, setMsg);
          setTimeout(() => {
            getMsg(id, doctorUserId);
          }, 200);
        }}
        className="btn-msg"
      >
        Wyślij
      </button>
      <button
        className="btn-msg"
        onClick={() => {
          getMsg(id, doctorUserId);
        }}
      >
        Refresh
      </button>
      <Conversation
        SecondUserMsg={SecondUserMsg}
        getMsg={getMsg}
        className="test1"
        currentPosts={currentPosts}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={all_msg_rev.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Email;
