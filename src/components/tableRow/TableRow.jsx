import TimeElement from "../timeElement/TimeElement";
import React from "react";

function TableRow({ film, tableData, setTableData, data, setData }) {
  let userData = JSON.parse(localStorage.getItem("currentUser"));
  let userFilms = userData.moviesInTheCart;
  const searchIndex = userFilms.findIndex(
    (object) => object.name === film.name
  );

  function removeItemFromCart(film, data, setTableData) {
    const searchIndex = userFilms.findIndex(
      (object) => object.name === film.name
    );
    let newUserFilms = [...userFilms];
    newUserFilms.splice(searchIndex, 1);

    const generalIndex = data.findIndex((object) => object.name === film.name);
    data[generalIndex].stock++;
    setData(data);

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...userData, moviesInTheCart: newUserFilms })
    );
    setTableData(newUserFilms);
  }

  return (
    <tr className="yourMovies-tr">
      <td>{film.name}</td>
      <td>{film.genre}</td>
      <td>
        <TimeElement searchIndex={searchIndex} tableData={tableData} setTableData={setTableData} />
      </td>
      <td>{((tableData[searchIndex].time / 12) * tableData[searchIndex].price).toFixed(2)} $</td>
      <td>
        <button
          className="remove-button"
          onClick={() => removeItemFromCart(film, data, setTableData)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
