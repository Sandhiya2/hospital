import "./App.css";
import {Route, Routes } from "react-router-dom";
import Login from "./components/Pages/Login";
import Main from "./Main";

function Doctor() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </div>
  );

  }
  export default Doctor;