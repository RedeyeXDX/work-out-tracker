import React, { useState, useEffect } from "react";
import axios from "axios";

function WorkOut() {
  const [workOuts, setWorkOuts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/workout");
        console.log(response);
        setWorkOuts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {workOuts.length > 0 ? (
        workOuts.map((workOut, index) => (
          <div key={index}>{workOut.workout}</div>
        ))
      ) : (
        <p>No workouts available</p>
      )}
    </>
  );
}

export default WorkOut;
