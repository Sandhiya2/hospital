import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import Mainbar from "./components/Sidebar/Mainbar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from "./components/Pages/Dashboard";
import Viewpatient from "./components/Pages/Viewpatient";
import Addconsult from "./components/Pages/Consult";
import Appointment from "./components/Pages/Appointment";
import Doctorprofile from "./components/Pages/Doctorprofile";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function Main() {
  
  const [doctor,setDoctor] = useState([])
  const [patient, setPatient] = useState([])


  const loadDoctor = useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/doctor/get");
    setDoctor(response.data);
  },[setDoctor])

  const loadPatient = useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/patient/get");
    setPatient(response.data);
  },[setPatient])

  useEffect(()=>{
    loadDoctor();
  },[loadDoctor])

  useEffect(()=>{
    loadPatient();
  },[loadPatient])
 
  return (
    <>
      <Mainbar />
      <SideBar>
      <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/viewpatient" element={<Viewpatient />} />
          <Route path="/addconsult" element={<Addconsult patient={patient} doctor={doctor}/>} />
          <Route path="/updateconsult/:consultid" element={<Addconsult patient={patient} doctor={doctor}/>} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/dprofile" element={<Doctorprofile/>} />


          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </>
  );
}

export default Main;
