import './navigation.css'
import { Link } from "react-router-dom";


function navigation() {
    return (
        <>
          <nav className='nav-container'>
            <ul className='nav-ul-left'>
              <Link to="/home">Home</Link>
              <Link to="/yourmovies">Your Movies</Link>
              <Link to="/profile">Profile</Link>
            </ul>
            <ul className='nav-ul-right'>
              <Link to="/login" onClick={logOut}>Log Out</Link>
            </ul>
          </nav>
        </>
    );
  }

function logOut() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let allUsers = JSON.parse(localStorage.getItem("users"));
    localStorage.removeItem("currentUser");
    const allUserData = [...allUsers]
    const targetUser = allUserData.find((user) => user.email === currentUser.email)
    targetUser.moviesInTheCart = currentUser.moviesInTheCart;
    localStorage.setItem("users", JSON.stringify(allUserData))  
  }
  
  export default navigation;