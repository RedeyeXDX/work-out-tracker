import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import UpdateWorkout from "./updateworkout";
import "./modal.css";

function Allworkout() {
  const [workOuts, setWorkOuts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/workout/All");
        setWorkOuts(response.data || []);
        console.log(response);
      } catch (error) {
        console.error("Error fetching workouts:", error.message);
        console.error("Response:", error.response?.data);
      }
    };
    fetchData();
  }, []);

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

  const openModal = (workOut) => {
    setSelectedWorkout(workOut);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWorkout(null);
    setModalOpen(false);
  };

  return (
    <>
      <h2 className="today-exercises">All exercises</h2>
      {workOuts.length > 0 ? (
        workOuts.map((workOut, index) => (
          <div key={index} className="workout">
            <h3>{workOut.name}</h3>
            <p>Duration: {workOut.duration} minutes</p>
            <p>Calories Burned: {workOut.caloriesBurned}</p>
            <FaPen onClick={() => openModal(workOut)} className="edit-button" />
            <RiDeleteBin6Line
              onClick={() => handleDelete(workOut._id)}
              className="delete-button"
            />
          </div>
        ))
      ) : (
        <h1>No exercises</h1>
      )}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="update-title">Update Workout</h2>
            {selectedWorkout && (
              <UpdateWorkout
                workoutId={selectedWorkout._id}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Allworkout;
