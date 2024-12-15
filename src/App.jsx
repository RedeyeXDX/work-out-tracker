import AddworkOut from "./addworkout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/addworkout" element={<AddworkOut />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
