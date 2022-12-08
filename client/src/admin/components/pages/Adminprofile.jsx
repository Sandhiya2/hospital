import React from 'react';
import "./admin.css";
import admin from "./images/admin.png"
const Adminprofile = () => {
  return (
    <>
    <h1 class="heading">Admin Profile</h1>
    <div className='adminbox'>
     <form className='adminprofile'>
      <tr>
      <td><label>Name</label></td>
      <td><input type="text" value="Admin"/></td></tr>
      <tr>
      <td><label>DOB</label></td>
      <td><input type="text" value="12-11-2001"/></td></tr>
      <tr>
      <td><label>Gender</label></td>
      <td><input type="text" value="Male"/></td></tr>
      <tr>
      <td><label>Department</label></td>
      <td><input type="text" value="Front Desk"/></td></tr>
      <tr>
      <td><label>Designation</label></td>
      <td><input type="text" value="System Administrator"/></td></tr>
      <tr>
      <td><label>Mobile No</label></td>
      <td><input type="text" value="9080987710"/></td></tr>
      <tr>
      <td><label>Address</label></td>
      <td><input type="text" value="Gandhi Nagar,Tiruppur"/></td></tr>
     </form>
     <img className="adminpic" src={admin} alt="admin" width="200" />
     </div>
 
        </>
  );
};
export default Adminprofile;