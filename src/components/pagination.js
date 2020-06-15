import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, id }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  let key = 0;
  return (
    <nav className="paginate">
      <ul>
        {pageNumbers.map((number) => (
          <a key={key++} href="##" onClick={() => paginate(number)}>
            <li key={number} className="paginate-li">
              {number}
            </li>
          </a>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
