import React from 'react';
import "./admin.css";
import doc from "./images/mdoc.png"
const Doctorprofile = () => {
  return (
    <>
    <h1 class="heading">Admin Profile</h1>
    <div className='adminbox'>
     <form className='adminprofile'>
      <tr>
      <td><label>Name</label></td>
      <td><input type="text" value="Doctor"/></td></tr>
      <tr>
      <td><label>DOB</label></td>
      <td><input type="text" value="10-10-1980"/></td></tr>
      <tr>
      <td><label>Gender</label></td>
      <td><input type="text" value="Male"/></td></tr>
      <tr>
      <td><label>Designation</label></td>
      <td><input type="text" value="Dean"/></td></tr>
      <tr>
      <td><label>Mobile No</label></td>
      <td><input type="text" value="9090567710"/></td></tr>
      <tr>
      <td><label>Address</label></td>
      <td><input type="text" value="Periyar Colony,Tiruppur"/></td></tr>
     </form>
     <img className="adminpic" src={doc} alt="doctor" width="200" />
     </div>
 
        </>
  );
};
export default Doctorprofile;