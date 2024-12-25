import React, { useState } from "react";
import axios from "axios";
import "./modal.css";

const Signup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const handleClose = () => {
    setAlert("");
    onClose();
  };

  const handleSignup = async () => {
    if (!email || !password) {
      setAlert("Email and password are required!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/login/signup", {
        email,
        password,
      });

      if (response.status === 201) {
        setAlert("Signup successful!");
        setEmail("");
        setPassword("");
      } else {
        setAlert("Signup failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setAlert(`Error: ${error.response.data.message}`);
      } else {
        setAlert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <div>
        <h3>email:</h3>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter new email"
        />
      </div>
      <div>
        <h3>Password</h3>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>
      <div>
        <button className="submit-button" onClick={handleSignup}>
          Sign Up
        </button>
        <button className="close-button" onClick={handleClose}>
          close
        </button>
      </div>
      <h4 className="alert">{alert}</h4>
    </>
  );
};

export default Signup;
