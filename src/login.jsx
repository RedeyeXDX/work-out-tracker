import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import logo from "./img/activesg-logo.png";
import Signup from "./signup";

const Login = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/login", user);
      if (response.status === 200) {
        navigate("/addworkout");
      } else {
        setError("Login Failed");
      }
    } catch (err) {
      console.log(err);
      setError("Login Failed");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <img src={logo} alt="logo" className="logo" />
        <h1 className="title">ActiveSG Workout tracker</h1>
      </div>
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <MdEmail className="img" />
            <input
              type="email"
              placeholder="Email"
              value={user.email || ""}
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
            />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <TbLockPassword className="img" />
            <input
              type="password"
              placeholder="Password"
              value={user.password || ""}
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Login
          </div>
          <div className="submit" onClick={() => setModalOpen(true)}>
            Sign Up
          </div>
        </div>
        <div>
          <p className="error-message">{error}</p>
        </div>
      </div>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="Sign-up">Sign Up</h2>
            <Signup onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
