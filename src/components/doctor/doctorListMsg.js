import React, { useState, useEffect } from "react";
import Axios from "axios";
import help from "../../forAll/help";
import BtnAction from "./btnAction";
import Conversation from "../conversation";
import Pagination from "../pagination";

const { url, id, auth, sendMsg, get_new_msg_detail } = help;

const DoctorListMsg = () => {
  const [myList, setmyList] = useState([]);
  const [patientmsg, setPatientmsg] = useState(false);
  const [patientId, setPatientId] = useState(false);
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [patientName, setPatientName] = useState("");
  const [new_msg, setNewMsg] = useState(0);

  const getMyList = () => {
    Axios.get(`${url}/doctors/${id}/my_patients/`, {
      headers: auth,
    })
      .then((res) => setmyList(res.data))
      .then((res) => get_new_msg_detail(id, setNewMsg))
      .catch((res) => alert(`Coś nie tak ${res.data}`));
  };

  const getMsg = (rId, sId) => {
    setPatientId(rId);
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
      setPatientmsg(res.data);
    });
  };

  useEffect(() => {
    getMyList();
  }, []);

  const all_msg = [];
  Object.keys({ ...patientmsg }).forEach((key) => {
    all_msg.push({ ...patientmsg[key] });
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = all_msg.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const li = document.body.querySelectorAll(".paginate-li");
    li.forEach((item) => {
      item.classList.remove("active");
    });
    li[pageNumber - 1].classList.add("active");
  };

  const chcek_list_msg = (new_msg_list, item) => {
    let to_compare_msg = [];

    Object.keys({ ...new_msg_list }).forEach((key) => {
      to_compare_msg.push({ ...new_msg_list[key] });
    });

    let num = to_compare_msg.filter((msg) => msg.sender === item);
    return num.length;
  };

  return (
    <div className="Mylist">
      <div>
        <ul>
          {myList.map((item) => (
            <>
              <BtnAction
                key={item.user.id}
                patient={item}
                doctor={id}
                action={getMsg}
                take_user_name={(name) => {
                  setPatientName(name);
                }}
                msg
                length_new_msg={chcek_list_msg(new_msg, item.user.id)}
              />
            </>
          ))}
        </ul>
      </div>
      {patientmsg && (
        <div className="doctor-msg">
          <div className="msg">
            <label htmlFor="msg">Wiadmość do pacjeta {patientName}</label>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              name=""
              id="msg"
              rows="5"
            ></textarea>
            <button
              onClick={() => {
                sendMsg(id, patientId, msg, setMsg);
                setTimeout(() => {
                  getMsg(patientId, id);
                }, 500);
              }}
              className="btn-msg"
            >
              Wyślij
            </button>
            <button
              className="btn-msg"
              onClick={() => {
                getMsg(patientId, id);
              }}
            >
              Odświeżanie
            </button>
            <Conversation patientId currentPosts={currentPosts} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={all_msg.length}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorListMsg;
