import "./yourMovies.css";
import TableRow from "../../components/tableRow/TableRow";
import React, { useState } from "react";

function YourMovies({ data, setData }) {
  let userData = JSON.parse(localStorage.getItem("currentUser"));
  let userFilms = userData.moviesInTheCart;
  userFilms.map(obj => ({ ...obj, time: 12 }))
  const [tableData, setTableData] = useState(userFilms);

  let initialValue = 0;
  const totalPrice = tableData.reduce(
    (accumulator, currentValue) => (accumulator + parseFloat((currentValue.price * currentValue.time / 12))), initialValue
  );

  return (
    <>
      <div className="yourMovies-container">
        <h1 className="yourMovies-title">Your movies</h1>
        {tableData.length === 0 && <h1 className="yourMovies-title">Empty</h1>}
        <table className="yourMovies-table">
          {tableData.length !== 0 && (
            <thead>
              <tr>
                <th>Name</th>
                <th>Genre</th>
                <th>Time</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
          )}
          <tbody>
            {tableData?.map((film, index) => {
              return (
                <TableRow
                  key={index}
                  film={film}
                  tableData={tableData}
                  setTableData={setTableData}
                  data={data}
                  setData={setData}
                />
              );
            })}
          </tbody>
        </table>
        {tableData.length !== 0 &&<h1 className="yourMovies-title">Grand total: {(totalPrice).toFixed(2)} $</h1>}
      </div>
    </>
  );
}

export default YourMovies;
