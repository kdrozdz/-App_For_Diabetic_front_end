import React, { useState, useEffect } from "react";
import Axios from "axios";
import Measurement from "./measurement";
import Pagination from "../pagination";
import help from "../../forAll/help";
const { url, auth, id } = help;

const MySugar = (props) => {
  const [patient, setPatient] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    Axios.get(`${url}/patient/${id}/`, {
      headers: auth,
    })
      .then((res) => {
        setPatient(res.data);
      })
      .catch((err) => {});
  }, []);

  const all_sugar_rev = [];

  Object.keys({ ...patient.all_sugar }).forEach((key) => {
    all_sugar_rev.unshift({ ...patient.all_sugar[key] });
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
    <div className="my-sugar-wrapper">
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
      <ul>
        <li>Average: {patient.avg_sugar}</li>
        <li>Average last 10: {patient.avg_sugar_10} </li>
        <li>Average of fasting blood sugar: {patient.avg_no_meal}</li>
        <li>Number of measurements {all_sugar_rev.length}</li>
      </ul>
    </div>
  );
};

export default MySugar;
