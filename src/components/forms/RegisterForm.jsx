import { useNavigate } from "react-router-dom";
import "./forms.css";
import { useState, useEffect } from "react";

function RegisterForm() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [emailAgain, setEmailAgain] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      setError(true);
      setErrorMessage("Invalid name");
      return;
    }

    if (surname.length < 2 && surname.length !== 0) {
      setError(true);
      setErrorMessage("Invalid surname");
      return;
    }

    if (allUsers?.find((e) => e.email === email)) {
      setError(true);
      setErrorMessage("Email is already taken");
      return;
    }

    if (!email) {
      setError(true);
      setErrorMessage("Email is required");
      return;
    }

    if (!(emailAgain === email)) {
      console.log("hello");
      setError(true);
      setErrorMessage("Emails aren't matching");
      return;
    }

    if (!password || password.length < 6) {
      setError(true);
      setErrorMessage("Invalid password/ Password is required");
      return;
    }

    if (password !== passwordAgain) {
      setError(true);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="surname">
          Surname
          <input
            className="main-input"
            type="text"
            name="surname"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </label>
        <label htmlFor="email" className="required">
          Email
          <input
            className="main-input"
            type="email"
            name="email"
            placeholder="email@accenture.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="emailAgain" className="required">
          Email again
          <input
            className="main-input"
            type="email"
            name="emailAgain"
            placeholder="email@accenture.com"
            value={emailAgain}
            onChange={(e) => setEmailAgain(e.target.value)}
          />
        </label>

        <label htmlFor="password" className="required">
          Password
          <input
            className="main-input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="passwordAgain" className="required">
          Password again
          <input
            className="main-input"
            type="password"
            name="passwordAgain"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
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
