import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const SessionForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  useEffect(() => {
    redirectIfLoggedIn();
  }, [props.loggedIn]);

  const redirectIfLoggedIn = () => {
    if (props.loggedIn) {
      history.push("/");
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };
    props
      .processForm(user)
      .then(() => history.push("/"))
      .catch((err) => setErrors(err.responseJSON));
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setErrors([]);
  };

  const renderErrors = () => {
    if (errors.length > 0) {
      return (
        <ul className="session-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="session-form-box">
      <button className="session-close-modal" onClick={props.closeModal} />
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="session-form-type">{props.formType}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={updateUsername}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
          className="login-input"
        />
        <input className="session-submit" type="submit" value="Submit" />
        {renderErrors()}
      </form>
    </div>
  );
};

export default SessionForm;
