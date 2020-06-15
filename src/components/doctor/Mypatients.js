import React, { useEffect, useState } from "react";
import Axios from "axios";
import help from "../../forAll/help";
import BtnAction from "../doctor/btnAction";
import Measurement from "../patient-componts/measurement";
import Pagination from "../pagination";

const { url, id, auth } = help;

const Mypatients = () => {
  const [myList, setmyList] = useState([]);
  const [patientDetail, setPatientDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const getMyList = () => {
    Axios.get(`${url}/doctors/${id}/my_patients/`, {
      headers: auth,
    })
      .then((res) => setmyList(res.data))
      .catch((res) => alert(`Coś nie tak ${res.data}`));
  };

  const RemovePatient = (userId) => {
    Axios.post(
      `${url}/doctors/rm_patient/`,
      {
        userId,
      },
      {
        headers: auth,
      }
    )
      .then((res) => {
        getMyList();
        setPatientDetail(false);
      })
      .catch((res) => alert("coś nie tak"));
  };

  const getPatientDetail = (id) => {
    Axios.get(`${url}/patient/${id}/`, {
      headers: auth,
    })
      .then((res) => setPatientDetail(res.data))
      .catch((res) => alert(`${res.data}`));
  };

  useEffect(() => {
    getMyList();
  }, []);

  const all_sugar_rev = [];

  Object.keys({ ...patientDetail.all_sugar }).forEach((key) => {
    all_sugar_rev.unshift(patientDetail.all_sugar[key]);
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = all_sugar_rev.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const li = document.body.querySelectorAll(".paginate-li");
    li.forEach((item) => {
      item.classList.remove("active");
    });
    li[pageNumber - 1].classList.add("active");
  };

  return (
    <div className="Mylist">
      <div>
        <ul>
          {myList.map((item) => (
            <BtnAction
              key={item.user.id}
              patient={item}
              doctor={id}
              action={getPatientDetail}
              actionSecond={RemovePatient}
              detail
            />
          ))}
        </ul>
      </div>
      <div>
        {patientDetail && (
          <div className="my-sugar-wrapper">
            <ul>
              <li>Nazwa: {patientDetail.user.username}</li>
              <br />
              <li>Średnia: {patientDetail.avg_sugar}</li>
              <li>Średnia 10 ostatnich: {patientDetail.avg_sugar_10} </li>
              <li>Średnia naczczo : {patientDetail.avg_no_meal}</li>
              <li>Liczba pomiarów {all_sugar_rev.length}</li>
            </ul>
            <ul>
              {currentPosts.map((item) => (
                <Measurement
                  key={item.date}
                  level={item.level}
                  date={item.date}
                  without_a_meal={item.without_a_meal}
                />
              ))}
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={all_sugar_rev.length}
                paginate={paginate}
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mypatients;
