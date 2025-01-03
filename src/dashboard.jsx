import React, { useState, useEffect } from "react";
import axios from "axios";
import CaloriesChart from "./CaloriesChart";
import "./App.css";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaChartSimple } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "./img/activesg-logo.png";
import Allworkout from "./allworkout";
import DurationChart from "./durationchart";
import { IoMdExit } from "react-icons/io";
import { useUser } from "./userContext";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/workout/All", {
          user: user.email,
        });
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workout data:", error.message);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <nav className="navbar">
        <Link to="/addworkout">
          <img src={logo} alt="logo" className="logo" />
        </Link>
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
        <div className="today-workout-section">
          {workouts.length > 0 ? (
            <>
              <CaloriesChart data={workouts} />
              <DurationChart data={workouts} />
            </>
          ) : (
            <p>No workout data available.</p>
          )}
        </div>
        <div className="exercises">
          <Allworkout workouts={workouts} onUpdate={() => triggerRefresh()} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
