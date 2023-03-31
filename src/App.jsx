import './App.css';
import { useState, useEffect } from "react";
import {Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navigation from "./components/navigation/navigation.jsx";
import Home from "./pages/home/home.jsx"
import Login from "./pages/login/login.jsx"
import Profile from "./pages/profile/profile.jsx"
import YourMovies from "./pages/yourMovies/yourMovies.jsx"
import Footer from "./components/footer/footer.jsx"
import list from "./fake-services/data.js"



function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState("");

  useEffect(() => {
    localStorage.setItem("movieList", JSON.stringify(list))
    setData(list) 
    if (localStorage.getItem("currentUser") === null) {
      navigate('/login', { replace: true })}
  }, []);
  
  const checkIfLoggedIn = () => {
    const routes = ["/home","/yourmovies","/profile"];
    return routes.includes(location.pathname)
  }

  return (
    <>
    <div className='app-container'>
      <h1 className='title'>Movie rental</h1>
      {checkIfLoggedIn() && <Navigation/>}
        <Routes>
          <Route path="/">
            <Route path="home" element={<Home data={data} setData={setData} />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="yourmovies" element={<YourMovies data={data} setData={setData}/>} />
          </Route>
        </Routes>    
    </div>
    <Footer/>
    </>
  );
}

export default App;
