import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const Notification = () => {

const [data, setData] = useState([]);

const loadData = async () => {
  const response = await axios.get("http://localhost:5000/notification/get");
  setData(response.data);
};

useEffect(() => {
  loadData();
}, []);

const deletemedi = (mediid) => {
  if(window.confirm("Are you sure that you want to Delete?")) {
      axios.delete(`http://localhost:5000/medi/remove/${mediid}`);
      toast.success("Medicine details Deleted Sucessfully");
      setTimeout(() => loadData(), 500);
  }
};

    return (
      <div className='adddepart'>
      <h1>Stock Management</h1>
<div className='viewmedi'>

<div className='medouterbox'>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>No.</th>
                    <th style={{textAlign:"center"}}>Medicine Name</th>
                    <th style={{textAlign:"center"}}>Category</th>
                    <th style={{textAlign:"center"}}>Type</th>
                    <th style={{textAlign:"center"}}>Price</th>
                    <th style={{textAlign:"center"}}>Stock</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.mediid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.medicinename}</td>
                            <td>{item.brand}</td>
                            <td>{item.meditype}</td>
                            <td>{item.price}</td>
                            <td>{item.stockstatus}</td>
                            <td>
                                <Link to={`/admin/main/updatemedi/${item.mediid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deletemedi(item.mediid)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
        </div>
        </div>

      
    );
  };
  
  export default Notification;
  