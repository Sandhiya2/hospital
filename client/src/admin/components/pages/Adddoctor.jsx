import React, {useState, useEffect, useCallback} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  doctorname : "",
  specialization : "",
  gender : "",
  mobile : "",
  email : "",
  address : "",
};

const Adddoctor = () => {

  const [state, setState]= useState(initialState);

  const {doctorname, specialization, gender, mobile, email, address} = state;

  const navigate = useNavigate();

  const {doctorid} = useParams();
  
  const loadData = useCallback(async()=>{
    const response = await axios.get(`http://localhost:5000/doctor/get/${doctorid}`);
    setState(response.data);
  },[doctorid])

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
      if(!doctorname || !specialization || !gender || !mobile || !email || !address){
          toast.error("All fields are Necessary");
      }else{
        if(!doctorid){
            axios.post("http://localhost:5000/doctor/post", {
              doctorname, 
              specialization, 
              gender, 
              mobile, 
              email, 
              address, 
              picture,
            }).then(() => {
                setState({doctorname : "", specialization : "", gender : "", mobile : "", email : "", address : "", profile : ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Doctor details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/doctor/updatedoctor/${doctorid}`, {
            doctorname, 
            specialization, 
            gender, 
            mobile, 
            email, 
            address, 
            picture,
          }).then(() => {
              setState({doctorname : "", specialization : "", gender : "", mobile : "", email : "", address : "", profile : ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate("/admin/main/viewdoctor"), 500);
        }
      };
      console.log(picture);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};
    return (
      <div className='adddepart'>
        <h1>Add Doctor</h1>
        <div class="doccontainer">
  <div class="opcontent">
  <form onSubmit={handleSubmit}>
  <table border="0" align="center">
  <tbody>
    <tr>
  <td><label >Doctor Name:</label></td>
        <td><input type="text" name='doctorname' id="doctorname" value={doctorname || ""} onChange={handleInputChange} pattern="[A-Za-z]{8-12}"/></td></tr>
  <tr>
  <td><label >Specialization:</label></td>
        <td><input type="text" name='specialization' id="specialization" value={specialization || ""} onChange={handleInputChange} pattern="[A-Za-z]{8-20}"/></td></tr>
  <tr>
  <td><label >Gender :</label></td>
        <td><input type="text" name='gender' id="gender" value={gender || ""} onChange={handleInputChange} /></td></tr>
  <tr>
  <td><label >Mobile:</label></td>
        <td><input type="number" name='mobile' id="" value={mobile || ""} onChange={handleInputChange} pattern="[0-9]{10}"/></td></tr>
  <tr>
  <td><label >Email:</label></td>
        <td><input type="email" name='email' id="email" value={email || ""} onChange={handleInputChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/></td></tr>
  <tr>
  <td><label >Address:</label></td>
        <td><textarea rows="4" cols="30" name='address' id="address" value={address || ""} onChange={handleInputChange} /></td></tr>
  <tr>
  <td><label >Profile:</label></td>
        <td><input type="file" name='profile' id="profile" onChange={handleImage} /></td></tr>

        <tr><td>
        <input type="submit" value={doctorid ? "Update" : "Add" } /></td></tr>
        </tbody>
        </table>
      </form>
  </div>
</div>
      </div>
    );
  };
  
  export default Adddoctor;
  