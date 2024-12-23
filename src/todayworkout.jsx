import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";

function TodayworkOut({ refresh }) {
  const [workOuts, setWorkOuts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/workout");
        setWorkOuts(response.data.workouts || []);
      } catch (error) {
        console.error("Error fetching workouts:", error.message);
        console.error("Response:", error.response?.data);
      }
    };
    fetchData();
  }, [refresh]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/workout/${id}`)
      .then(() => {
        setWorkOuts((prevWorkouts) =>
          prevWorkouts.filter((workouts) => workouts._id !== id)
        );
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <>
      <h2 className="today-exercises">Today Exercises</h2>
      {workOuts.length > 0 ? (
        workOuts.map((workOut, index) => (
          <div key={index} className="workout">
            {workOut.name}
            <p>Duration: {workOut.duration} minutes</p>
            <p>Calories Burned: {workOut.caloriesBurned}</p>
            <FaPen />
            <RiDeleteBin6Line
              onClick={() => handleDelete(workOut._id)}
              className="delete-button"
            />
          </div>
        ))
      ) : (
        <h1>No exercises today</h1>
      )}
    </>
  );
}

export default TodayworkOut;
