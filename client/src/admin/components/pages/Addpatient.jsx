import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  name : "",
  gender: "",
  doctorid:"",
  mobile : "",
  dob : "",
  age : "",
  email : "",
  occupation : "",
  marital : "",
  bg : "",
  address : "",
  allergy : "",
  patienttype : "",
  disease : ""
};

const Addpatient = ({doctor}) => {

  console.log(doctor)

  const [state, setState]= useState(initialState);

  const {name,gender,doctorid,mobile,dob,age,email,occupation,marital,bg,address,allergy,patienttype,disease} = state;

  const navigate = useNavigate();

  const {patientid} = useParams();

  console.log(doctorid)
  
  useEffect(() => {
    axios.get(`http://localhost:5000/patient/get/${patientid}`)
    .then((resp) => setState({...resp.data[0]}));
}, [patientid]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!name || !gender || !mobile ||!doctorid || !dob || !age || !email || !occupation || !marital || !bg || !address || !allergy || !patienttype){
          toast.error("All fields are Necessary");
      }else{
        if(!patientid){
            axios.post("http://localhost:5000/patient/post", {
              name,
              gender,
              mobile,
              dob,
              age,
              email,
              occupation,
              marital,
              bg,
              address,
              allergy,
              patienttype,
              disease,
              doctorid
          }).then(() => {
                setState({name:"",doctorid:"",gender:"",mobile:"",dob:"",age:"",email:"",occupation:"",marital:"",bg:"",address:"",allergy:"",patienttype:"",disease:""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Patient details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/patient/updatepatient/${patientid}`, {
            name,
            gender,
            mobile,
            dob,
            age,
            email,
            occupation,
            marital,
            bg,
            address,
            allergy,
            patienttype,
            disease,
            doctorid
          }).then(() => {
              setState({name : "",doctorid:"",gender : "",mobile : "",dob : "",age : "",email : "",occupation : "",marital : "",bg : "",address : "",allergy :"",patienttype : "",disease : ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate ("/admin/main/viewpatient"), 200);
        }
      };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};

    return (
      <div className='addpatient'>
        <h1>Add Patient</h1>
      <div class="container">
      <div class="content">
      <form onSubmit={handleSubmit}>
          <div class="user-details">
            <div class="input-box">
              <span class="details">Patient Name:</span>
              <input type="text" name='name' id="name" value={name || ""} onChange={handleInputChange} pattern="[A-Za-z]{8-12}"/>
            </div>
            <div className="input-box">
              <span className="details">Doctor</span>
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
            <span class="details">Gender:</span>
            <select name="gender" id="gender" value={gender || ""} onChange={handleInputChange} >
                  <option>--Select--</option>
                  <option>Male</option>
                  <option>Female</option>
              </select>
          </div>
            <div class="input-box">
              <span class="details">Mobile No.:</span>
              <input type="number" name="mobile" id="mobile" value={mobile || ""} onChange={handleInputChange} pattern="[0-9]{10}"/>
            </div>
            <div class="input-box">
              <span class="details">Date of Birth:</span>
              <input type="date" name="dob" id="dob" value={dob || ""} onChange={handleInputChange} />
            </div>
            <div class="input-box">
              <span class="details">Age:</span>
              <input type="number" name="age" id="age" value={age || ""} onChange={handleInputChange} pattern="[0-9]{2-3}"/>
            </div>
            <div class="input-box">
              <span class="details">Email:</span>
              <input type="email" name="email" id = "email" value={email || ""} onChange={handleInputChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
            </div>
            <div class="input-box">
              <span class="details">Occupation:</span>
              <input type="text" name="occupation" id="occupation" value={occupation || ""} onChange={handleInputChange} />
            </div>
            <div class="input-box">
              <span class="details">Marital Status:</span>
              <select name="marital" id="marital" value={marital || ""} onChange={handleInputChange}>
                  <option>--Select--</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
              </select>
            </div>
            <div class="input-box">
              <span class="details">Blood Group:</span>
              <select name="bg" id="bg" value={bg || ""} onChange={handleInputChange}>
              <option>--Select--</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
              </select>
            </div>
            <div class="input-box">
              <span class="details">Patient Type:</span>
              <select name="patienttype" id="patienttype" value={patienttype || ""} onChange={handleInputChange} >
                  <option>--Select--</option>
                  <option>Inpatient</option>
                  <option>Outpatient</option>
              </select>
            </div>
            <div class="input-box">
              <span class="details">Address:</span>
              <textarea name="address" id="address" value={address || ""} rows="4" cols="50" onChange={handleInputChange}></textarea>
            </div>
            <div class="input-box">
              <span class="details">Allergic To:</span>
              <textarea name="allergy" id="allergy" value={allergy || ""} rows="4" cols="50" onChange={handleInputChange}></textarea>
            </div>
            <div class="input-box">
              <span class="details">Disease:</span>
              <textarea name="disease" id="disease" value={disease || ""} rows="4" cols="50" onChange={handleInputChange}></textarea>
            </div>
          </div>
          <div class="button">
          <input type="submit" value={patientid ? "Update" : "Add" } />
          </div>
        </form>
      </div>
      </div>
    </div>
    );
  };
  
  export default Addpatient;
  