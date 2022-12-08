import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  departmentname: "",
  description: "",
};

const Adddepartment = () => {

  const [state, setState]= useState(initialState);

  const {departmentname, description,} = state;

  const navigate = useNavigate();

  const {iddepartment} = useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${iddepartment}`)
    .then((resp) => setState({...resp.data[0]}));
}, [iddepartment]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!departmentname || !description){
          toast.error("All fields are Necessary");
      }else{
        if(!iddepartment){
            axios.post("http://localhost:5000/api/post", {
                departmentname,
                description,
            }).then(() => {
                setState({departmentname: "", description: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Department Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/api/update/${iddepartment}`, {
              departmentname,
              description,
          }).then(() => {
              setState({departmentname: "", description: ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate("/admin/main/viewdepartment"), 200);
        }
      };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};
    return (
      <div className='adddepart'>
        <h1>Add Department</h1>
        <div class="departcontainer">
  <div class="departcontent">
  <form onSubmit={handleSubmit}>
  <label >Department Name:</label>{" "}
        <input type="text" name='departmentname' id="departmentname" value={departmentname || ""} onChange={handleInputChange} /><br/>
  <label >Description:</label>{" "}
        <textarea rows="4" cols="30" name='description' id="description" value={description || ""} onChange={handleInputChange} /><br/>
        <input type="submit" value={iddepartment ? "Update" : "Add" } />
      </form>
  </div>
</div>
      </div>
    );
  };
  
  export default Adddepartment;
  