import React, { useState } from "react";
import axios from "axios";
import "./modal.css";

const UpdateWorkout = ({ workoutId, onClose, onUpdate }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [alert, setAlert] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      if (name) updatedData.name = name;
      if (duration) updatedData.duration = duration;
      if (caloriesBurned) updatedData.caloriesBurned = caloriesBurned;

      await axios.put(
        `http://localhost:3000/workout/${workoutId}`,
        updatedData
      );
      setAlert("Workout updated successfully!");
    } catch (error) {
      console.error("Error updating workout:", error.message);
      setAlert("Error updating workout");
    }
  };

  const handleClose = () => {
    setAlert("");
    onClose();
    onUpdate();
  };

  return (
    <>
      <div>
        <h3>workout: </h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Update name"
        />
      </div>
      <div>
        <h3>Duration (minutes): </h3>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Update duration"
        />
      </div>
      <div>
        <h3>Calories Burned: </h3>
        <input
          type="number"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          placeholder="Update calories"
        />
      </div>
      <div>
        <button className="submit-button" onClick={handleUpdate}>
          Save Changes
        </button>
        <button className="close-button" onClick={handleClose}>
          close
        </button>
      </div>
      <h4 className="alert">{alert}</h4>
    </>
  );
};

export default UpdateWorkout;
