import "./home.css"
import React from 'react';
import notInStockImg from "../../assets/not_available.png"
import inStockImg from "../../assets/available.png"

function home({ data, setData }) {
  const rent = (film) => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let currentUserFilms = currentUser.moviesInTheCart
    const index = currentUserFilms.findIndex(element => element.id === film.id)

    if(film.stock === 0 && index === -1) return 

    const newData = [ ...data ]
    const newFilm = newData.find((item) => item.id === film.id)
    if (index !== -1) {
      newFilm.stock++
      const index = currentUserFilms.findIndex(element => element.id === film.id)
      currentUserFilms = currentUserFilms.splice(index, 1)
    } else {
      newFilm.stock--
      film.time = 12;
      currentUserFilms.push(film)  
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser, {moviesInTheCart: currentUserFilms}))
    setData(newData)
  }

  return (
    <>
      <div className="home-container">
        <h1 className="home-title">Available Movies</h1>
        <table className="movie-table">
          <thead className="movie-table-header">
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>Price for 12h</th>
              <th>Stock</th>
              <th>Is in stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="movie-table-body">
            {data && data.map((film, index) => {
              let currentUser = JSON.parse(localStorage.getItem("currentUser"));
              const filmIndex = currentUser.moviesInTheCart.findIndex(element => element.id === film.id)
              let notInStock = !film.stock && filmIndex === -1 ? "not-available": "";
              let rented = filmIndex !== -1 && !notInStock ? "rented": "";
              let classes = `rent-button ${notInStock} ${rented}`;

              return (
                <tr className="movie-table-tr" key={index}>
                  <td>{film.name}</td>
                  <td>{film.genre}</td>
                  <td>{film.price}$</td>
                  <td>{film.stock}</td>
                  <td><img src={film.stock <= 0 ? notInStockImg: inStockImg} alt=""></img></td>
                  <td><button className={classes} onClick={() => rent(film)}>Rent</button></td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>  
    </>
  );
}

export default home;