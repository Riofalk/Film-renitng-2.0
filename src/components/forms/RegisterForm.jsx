import { useNavigate } from "react-router-dom";
import "./forms.css";
import { useState, useEffect } from "react";

function RegisterForm() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let name = e.target.name.value.toLowerCase();
    let surname = e.target.surname.value.toLowerCase();
    let email = e.target.email.value;
    let emailAgain = e.target.emailAgain.value;
    let password = e.target.password.value;
    let passwordAgain = e.target.passwordAgain.value;

    let allUsers =
      JSON.parse(localStorage.getItem("users")) == null
        ? []
        : JSON.parse(localStorage.getItem("users"));

    let registartionInfo = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      sname: surname.charAt(0).toUpperCase() + surname.slice(1),
      email: email,
      password: password,
      moviesInTheCart: [],
    };

    if (name.length < 2) {
      setError(true)
      setErrorMessage("Invalid name");
      return;
    }

    if (surname.length < 2 && surname.length !== 0) {
      setError(true)
      setErrorMessage("Invalid surname");
      return;
    }

    if (allUsers?.find((e) => e.email === email)) {
      setError(true)
      setErrorMessage("Email is already taken");
      return;
    }

    if (!email) {
      setError(true)
      setErrorMessage("Email is required");
      return;
    }

    if (!(emailAgain === email)) {
      console.log("hello")
      setError(true)
      setErrorMessage("Emails aren't matching");
      return;
    }

    if (!password || password.length < 6) {
      setError(true)
      setErrorMessage("Invalid password/ Password is required");
      return;
    }

    if (password !== passwordAgain) {
      setError(true)
      setErrorMessage("Passwords don't match");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(registartionInfo));
    allUsers.push(registartionInfo);
    localStorage.setItem("users", JSON.stringify(allUsers));
    redirect();
  };

  return (
    <div className="sign-in-container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="required">
          Name
          <input
            className="main-input"
            type="text"
            name="name"
            placeholder="name"
          />
        </label>
        <label htmlFor="surname">
          Surname
          <input
            className="main-input"
            type="text"
            name="surname"
            placeholder="Surname"
          />
        </label>
        <label htmlFor="email" className="required">
          Email
          <input
            className="main-input"
            type="email"
            name="email"
            placeholder="email@accenture.com"
          />
        </label>
        <label htmlFor="emailAgain" className="required">
          Email again
          <input
            className="main-input"
            type="email"
            name="emailAgain"
            placeholder="email@accenture.com"
          />
        </label>

        <label htmlFor="password" className="required">
          Password
          <input className="main-input" type="password" name="password" />
        </label>
        <label htmlFor="passwordAgain" className="required">
          Password again
          <input className="main-input" type="password" name="passwordAgain" />
        </label>
        {error && <p className="error-message">{errorMessage}</p>}
        <div className="button-container">
          <button className="sign-in">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
