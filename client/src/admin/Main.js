import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import Mainbar from "./components/Sidebar/Mainbar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from "./components/pages/Dashboard";
import Adddepartment from "./components/pages/Adddepartment";
import Viewdepartment from "./components/pages/Viewdepartment";
import Addpatient from "./components/pages/Addpatient";
import Viewpatient from "./components/pages/Viewpatient";
import Inpatient from "./components/pages/Inpatient";
import Outpatient from "./components/pages/Outpatient";
import Adddoctor from "./components/pages/Adddoctor";
import Viewdoctor from "./components/pages/Viewdoctor";
import Addconsult from "./components/pages/Consult";
import Addstaff from "./components/pages/Addstaff";
import Viewstaff from "./components/pages/Viewstaff";
import Roomcategory from "./components/pages/Roomcategory";
import Bedstatus from "./components/pages/Bedstatus";
import Addmedicines from "./components/pages/Addmedicines";
import Addsales from "./components/pages/Addsales";
import Laboratory from "./components/pages/Laboratory";
import Viewlab from "./components/pages/Viewlab";
import Notification from "./components/pages/Notification";
import Summary from "./components/pages/Summary";
import Appointment from "./components/pages/Appointment";
import Billing from "./components/pages/Billing";
import Inreport from "./components/pages/Inreport";
import Opreport from "./components/pages/Outreport";
import Labreport from "./components/pages/Labreport";
import Salesreport from "./components/pages/Salesreport";
import Adminprofile from "./components/pages/Adminprofile";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function Main() {
  
  const [doctor,setDoctor] = useState([])
  const [patient, setPatient] = useState([])
  const [medicine, setMedicine] = useState([])
  const [lab, setLab] = useState([])
  const [room, setRoom] = useState([])
  const [bed, setBed] = useState([])

  const loadDoctor = useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/doctor/get");
    setDoctor(response.data);
  },[setDoctor])

  const loadPatient = useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/patient/get");
    setPatient(response.data);
  },[setPatient])

  const loadMedicine = useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/medi/get");
    setMedicine(response.data);
  },[setMedicine])

  const loadLab = useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/lab/get");
    setLab(response.data);
  },[setLab])

  const loadRoom = useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/room/get");
    setRoom(response.data);
  },[setRoom])

  const loadBed = useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/bed/get");
    setBed(response.data);
  },[setBed])

  useEffect(()=>{
    loadDoctor();
  },[loadDoctor])

  useEffect(()=>{
    loadPatient();
  },[loadPatient])

  useEffect(()=>{
    loadMedicine();
  },[loadMedicine])

  useEffect(()=>{
    loadLab();
  },[loadLab])

  useEffect(()=>{
    loadRoom();
  },[loadRoom])

  useEffect(()=>{
    loadBed();
  },[loadBed])

  return (
    <>
      <Mainbar />
      <SideBar>
      <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/adddepartment" element={<Adddepartment />} />
          <Route path="/viewdepartment" element={<Viewdepartment />} />
          <Route path="/update/:iddepartment" element={<Adddepartment />} />
          <Route path="/addpatient" element={<Addpatient doctor={doctor}/>} />
          <Route path="/inpatient" element={<Inpatient patient={patient} room={room} bed={bed} lab={lab}/>} />
          <Route path="/updatein/:inid" element={<Inpatient patient={patient} room={room} bed={bed} lab={lab}/>} />
          <Route path="/outpatient" element={<Outpatient patient={patient} doctor={doctor} lab={lab}/>} />
          <Route path="/updateout/:outid" element={<Outpatient patient={patient} doctor={doctor} lab={lab}/>} />
          <Route path="/viewpatient" element={<Viewpatient />} />
          <Route path="/updatepatient/:patientid" element={<Addpatient doctor={doctor}/>} />
          <Route path="/adddoctor" element={<Adddoctor />} />
          <Route path="/viewdoctor" element={<Viewdoctor />} />
          <Route path="/updatedoctor/:doctorid" element={<Adddoctor />} />
          <Route path="/addconsult" element={<Addconsult patient={patient} doctor={doctor}/>} />
          <Route path="/updateconsult/:consultid" element={<Addconsult patient={patient} doctor={doctor}/>} />
          <Route path="/addstaff" element={<Addstaff />} />
          <Route path="/viewstaff" element={<Viewstaff />} />
          <Route path="/updatestaff/:idstaff" element={<Addstaff />} />
          <Route path="/roomcategory" element={<Roomcategory />} />
          <Route path="/updateroom/:roomid" element={<Roomcategory />} />
          <Route path="/bedstatus" element={<Bedstatus room={room}/>} />
          <Route path="/updatebed/:bedid" element={<Bedstatus room={room}/>} />
          <Route path="/addmedicines" element={<Addmedicines />} />
          <Route path="/updatemedi/:mediid" element={<Addmedicines />} />
          <Route path="/addsales" element={<Addsales patient={patient} medicine={medicine}/>} />
          <Route path="/updatesales/:saleid" element={<Addsales patient={patient} medicine={medicine}/>} />
          <Route path="/lab" element={<Laboratory patient={patient} doctor={doctor}/>} />
          <Route path="/viewlab" element={<Viewlab />} />
          <Route path="/updatelab/:labid" element={<Laboratory patient={patient} doctor={doctor}/>} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/summary" element={<Summary/>} />
          <Route path="/inreport" element={<Inreport/>} />
          <Route path="/opreport" element={<Opreport/>} />
          <Route path="/labreport" element={<Labreport/>} /> 
          <Route path="/salesreport" element={<Salesreport/>} /> 
          <Route path="/aprofile" element={<Adminprofile/>} />


          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </>
  );
}

export default Main;
