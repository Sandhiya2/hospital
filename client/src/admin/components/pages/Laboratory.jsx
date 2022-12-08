import React, {useState, useEffect, useCallback} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  patientid :"",
  doctorid :"",
  testdate : "",
  category : "",
  testamount : "",
};

const Addlab = ({patient,doctor}) => {

  console.log(patient)
  console.log(doctor)

  const [state, setState]= useState(initialState);

  const {patientid,doctorid,testdate,category,testamount} = state;

  const navigate = useNavigate();

  const {labid} = useParams();

  console.log(patientid)
  console.log(doctorid)
  
  const loadData = useCallback(async()=>{
    const response = await axios.get(`http://localhost:5000/lab/get/${labid}`);
    setState(response.data);
  },[labid])

  const [picture,setPicture] = useState([]);
  useEffect(() =>{
    loadData();
  },[loadData])  

  const handleImage = (e) =>{
    console.log(e.target.files[0])
    setPicture({ images: e.target.files[0].name})
  }

  console.log(state);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!patientid || !doctorid || !testdate || !category || !testamount){
          toast.error("All fields are Necessary");
      }else{
        if(!labid){
            axios.post("http://localhost:5000/lab/post", {
              patientid ,
              doctorid,
              testdate,
              category ,
              picture,
              testamount,
          }).then(() => {
                setState({patientid : "",doctorid : "", testdate : "", category : "", report : "", testamount : ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Lab details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/lab/updatelab/${labid}`, {
            patientid ,
            doctorid,
            testdate,
            category ,
            picture,
            testamount,
          }).then(() => {
              setState({patientid : "",doctorid : "", testdate : "", category : "", report : "", testamount : ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate ("/admin/main/viewlab"), 200);
        }
      };
      console.log(picture);
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};

    return (
      <div className='addpatient'>
        <h1>Manage Lab Details</h1>
      <div class="container">
      <div class="content">
      <form onSubmit={handleSubmit}>
          <div class="user-details">
            <div class="input-box">
              <span class="details">Patient Name:</span>
              <select required name="patientid" id="patientid"  onChange={handleInputChange}>
                  <option>Select Patient</option>
                  {
                    patient.map((ptn,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={ptn.patientid}>{ptn.name}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select>
            </div>
            <div className="input-box">
              <span className="details">Doctor Name:</span>
              <select required name="doctorid" id="doctorid"  onChange={handleInputChange}>
                  <option>Select Doctor</option>
                  {
                    doctor.map((doc,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={doc.doctorid}>{doc.doctorname}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select>
            </div>
            <div class="input-box">
              <span class="details">Date:</span>
              <input type="date" name="testdate" id="testdate" value={testdate || ""} onChange={handleInputChange} />
            </div>
            <div class="input-box">
            <span class="details">Category:</span>
            <select name="category" id="category" value={category || ""} onChange={handleInputChange} >
                  <option>--Select category--</option>
                  <option>Nil</option>
                  <option>Micorobiology</option>
                  <option>Pathology</option>
                  <option>Biochemistry</option>
              </select>
          </div>
          <div class="input-box">
              <span class="details">Test Report:</span>
              <input type="file" name="report" id="report" onChange={handleImage} />
            </div>
            <div class="input-box">
              <span class="details">Amount:</span>
              <input type="number" name="testamount" id="testamount" value={testamount || ""} onChange={handleInputChange} />
            </div>
          </div>
          <div class="button">
          <input type="submit" value={labid ? "Update" : "Add" } />
          </div>
        </form>
      </div>
      </div>
    </div>
    );
  };
  
  export default Addlab;
  