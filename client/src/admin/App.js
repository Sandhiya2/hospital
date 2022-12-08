import "./App.css";
import {Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Main from "./Main";
function Admin() {
  
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </div>
  );

  }
  export default Admin;