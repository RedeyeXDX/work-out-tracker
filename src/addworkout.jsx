import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/activesg-logo.png";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaChartSimple } from "react-icons/fa6";
import "./App.css";
import TodayworkOut from "./todayworkout";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { useUser } from "./userContext";

function Addworkout() {
  const { user } = useUser();
  const [workout, setWorkout] = useState({
    name: "",
    duration: "",
    caloriesBurned: "",
  });
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/workout", {
        ...workout,
        user: user.email,
      });
      setMessage(response.data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="logo" className="logo" />
        <Link to="/Dashboard">
          <FaChartSimple className="chart-icon" />
        </Link>
        <Link to="/addworkout">
          <GiWeightLiftingUp className="weight-lifting" />
        </Link>
        <Link to="/Login">
          <IoMdExit className="exit-button" />
        </Link>
      </nav>
      <div className="workout-layout">
        <div className="add-workout-section">
          <h2 className="add-workout">Add Workout</h2>
          <div className="underline"></div>
          <div className="inputs">
            <div className="input">
              Workout Name:
              <input
                type="text"
                value={workout.name}
                onChange={(e) =>
                  setWorkout({ ...workout, name: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="inputs">
            <div className="input">
              Duration (minutes):
              <input
                type="number"
                value={workout.duration}
                onChange={(e) =>
                  setWorkout({ ...workout, duration: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="inputs">
            <div className="input">
              Calories Burned:
              <input
                type="number"
                value={workout.caloriesBurned}
                onChange={(e) =>
                  setWorkout({ ...workout, caloriesBurned: e.target.value })
                }
                required
              />
            </div>
          </div>
          <button type="submit" className="submit" onClick={handleSubmit}>
            Add Workout
          </button>
          {message && <p>{message}</p>}
        </div>
        <div className="today-workout-section">
          <TodayworkOut refresh={refresh} />
        </div>
      </div>
    </>
  );
}

export default Addworkout;
