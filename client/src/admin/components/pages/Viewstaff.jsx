import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./admin.css";
import {toast} from "react-toastify";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const Viewstaff = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/staff/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

const deleteStaff = (idstaff) => {
        if(window.confirm("Are you sure that you want to Delete?")) {
            axios.delete(`http://localhost:5000/staff/remove/${idstaff}`);
            toast.success("Staff details Deleted Sucessfully");
            setTimeout(() => loadData(), 500);
        }
    };
  return (
    <>
    <h1 class="heading">Manage Staff Details</h1>
    <div className='outerbox'>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>No.</th>
                    <th style={{textAlign:"center"}}>Staff Name</th>
                    <th style={{textAlign:"center"}}>Designation</th>
                    <th style={{textAlign:"center"}}>Salary</th>
                    <th style={{textAlign:"center"}}>Mobile</th>
                    <th style={{textAlign:"center"}}>Email</th>
                    <th style={{textAlign:"center"}}>Address</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.idstaff}>
                            <th scope="row">{index+1}</th>
                            <td>{item.staffname}</td>
                            <td>{item.designation}</td>
                            <td>{item.salary}</td>
                            <td>{item.staffmobile}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>
                                <Link to={`/admin/main/updatestaff/${item.idstaff}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteStaff(item.idstaff)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
            <Link to="/admin/main/addstaff">
        <button className='btn btn-contact'><FaPlus />Add Staff</button>
        </Link>
        </div>
        </>
  );
};
export default Viewstaff;