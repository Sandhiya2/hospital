import React,{useState,useEffect} from 'react';
import "./admin.css";
import {toast} from "react-toastify";
import axios from "axios";

const Appointment = () => {

  const [data, setData] = useState([]);

  const loadData = async () => {
      const response = await axios.get("http://localhost:5000/appointment/get");
      setData(response.data);
  };
  
  useEffect(() => {
      loadData();
  }, []);
  
    
  const confirmapp = () => {
    if(window.confirm("Confirm Appointment?")) {
        toast.success("Appointment Confirmed");
        setTimeout(() => loadData(), 500);
    }
  };
  
  const deleteapp = (appid) => {
    if(window.confirm("Are you sure that you want to Delete?")) {
        axios.delete(`http://localhost:5000/appointment/remove/${appid}`);
        toast.success("Appointment cancelled");
        setTimeout(() => loadData(), 500);
    }
  };

    return (
      <div className='viewroom'>
             <h1 class="heading">Appointment Confirmation</h1><br></br>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>No.</th>
                    <th style={{textAlign:"center"}}>Name</th>
                    <th style={{textAlign:"center"}}>Phone</th>
                    <th style={{textAlign:"center"}}>Email</th>
                    <th style={{textAlign:"center"}}>Date</th>
                    <th style={{textAlign:"center"}}>Time</th>
                    <th style={{textAlign:"center"}}>Department</th>
                    <th style={{textAlign:"center"}}>Doctor</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.appid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.fullname}</td>
                            <td>{item.mobile}</td>
                            <td>{item.email}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>{item.depart}</td>
                            <td>{item.doctor}</td>
                            <td>
                                <button className='btn btn-edit' onClick={() => confirmapp()}>Confirm</button>
                                <button className='btn btn-delete' onClick={() => deleteapp(item.appid)}>Cancel</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
    )
  };
  
  export default Appointment;
  