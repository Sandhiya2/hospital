import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./admin.css";
import {toast} from "react-toastify";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const Viewdepartment = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

const deleteDepartment = (iddepartment) => {
        if(window.confirm("Are you sure that you want to Delete?")) {
            axios.delete(`http://localhost:5000/api/remove/${iddepartment}`);
            toast.success("Department Deleted Sucessfully");
            setTimeout(() => loadData(), 500);
        }
    };
  return (
    <>
    <h1 class="heading">Manage Department</h1>
    <div className='outerbox'>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>No.</th>
                    <th style={{textAlign:"center"}}>Department Name</th>
                    <th style={{textAlign:"center"}}>Description</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.iddepartment}>
                            <th scope="row">{index+1}</th>
                            <td>{item.departmentname}</td>
                            <td>{item.description}</td>
                            <td>
                                <Link to={`/admin/main/update/${item.iddepartment}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteDepartment(item.iddepartment)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
            <Link to="/admin/main/adddepartment">
        <button className='btn btn-contact'><FaPlus />Add Department</button>
        </Link>
        </div>
        </>
  );
};
export default Viewdepartment;