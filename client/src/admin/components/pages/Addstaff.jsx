import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  staffname : "", 
  designation : "", 
  salary : "", 
  staffmobile : "", 
  email : "", 
  address : "",
};

const Addstaff = () => {

  const [state, setState]= useState(initialState);

  const {staffname, designation, salary, staffmobile, email, address} = state;

  const navigate = useNavigate();

  const {idstaff} = useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/staff/get/${idstaff}`)
    .then((resp) => setState({...resp.data[0]}));
}, [idstaff]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!staffname || !designation || !salary || !staffmobile || !email || !address){
          toast.error("All fields are Necessary");
      }else{
        if(!idstaff){
            axios.post("http://localhost:5000/staff/post", {
                staffname,
                designation,
                salary, 
                staffmobile, 
                email, 
                address,
            }).then(() => {
                setState({staffname: "", designation: "", salary: "", staffmobile: "", email: "", address: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Staff details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/staff/updatestaff/${idstaff}`, {
              staffname,
              designation,
              salary, 
              staffmobile, 
              email, 
              address,
          }).then(() => {
              setState({staffname: "", designation: "", salary: "", staffmobile: "", email: "", address: ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate("/admin/main/viewstaff"), 200);
        }
      };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};
    return (
      <div className='adddepart'>
        <h1>Add Staff</h1>
        <div class="staffcontainer">
  <div class="opcontent">
  <form onSubmit={handleSubmit}>
  <table border="0" align="center">
  <tbody>
    <tr>
  <td><label >Staff Name:</label></td>
        <td><input type="text" name='staffname' id="staffname" value={staffname || ""} onChange={handleInputChange} pattern="[A-Za-z]{8-12}"/></td></tr>
  <tr>
  <td><label >Designation:</label></td>
        <td><input type="text" name='designation' id="designation" value={designation || ""} onChange={handleInputChange} /></td></tr>
  <tr>
  <td><label >Salary:</label></td>
        <td><input type="number" name='salary' id="salary" value={salary || ""} onChange={handleInputChange} /></td></tr>
  <tr>
  <td><label >Mobile:</label></td>
        <td><input type="number" name='staffmobile' id="" value={staffmobile || ""} onChange={handleInputChange} pattern="[0-9]{10}"/></td></tr>
  <tr>
  <td><label >Email:</label></td>
        <td><input type="email" name='email' id="email" value={email || ""} onChange={handleInputChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/></td></tr>
  <tr>
  <td><label >Address:</label></td>
        <td><textarea rows="4" cols="30" name='address' id="address" value={address || ""} onChange={handleInputChange} /></td></tr>
        <tr><td>
        <input type="submit" value={idstaff ? "Update" : "Add" } /></td></tr>
        </tbody>
        </table>
      </form>
  </div>
</div>
      </div>
    );
  };
  
  export default Addstaff;
  