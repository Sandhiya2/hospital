import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./admin.css";
import {toast} from "react-toastify";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const Viewdoctor = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/doctor/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    console.log(data);

const deleteDoctor = (doctorid) => {
        if(window.confirm("Are you sure that you want to Delete?")) {
            axios.delete(`http://localhost:5000/doctor/remove/${doctorid}`);
            toast.success("Doctor details Deleted Sucessfully");
            setTimeout(() => loadData(), 500);
        }
    };
  return (
    <>
    <h1 class="heading">Manage Doctor Details</h1>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>No.</th>
                    <th style={{textAlign:"center"}}>Doctor Name</th>
                    <th style={{textAlign:"center"}}>Specialization</th>
                    <th style={{textAlign:"center"}}>Gender</th>
                    <th style={{textAlign:"center"}}>Mobile</th>
                    <th style={{textAlign:"center"}}>Email</th>
                    <th style={{textAlign:"center"}}>Address</th>
                    <th style={{textAlign:"center"}}>Profile</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.doctorid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.doctorname}</td>
                            <td>{item.specialization}</td>
                            <td>{item.gender}</td>
                            <td>{item.mobile}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td><img src={require(`./images/${item.profile}`)} alt={item.profile} width={50} height={50}/></td>
                            <td>
                                <Link to={`/admin/main/updatedoctor/${item.doctorid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteDoctor(item.doctorid)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
            <Link to="/admin/main/adddoctor">
        <button className='btn btn-contact'><FaPlus />Add Doctor</button>
        </Link>
        </>
  );
};
export default Viewdoctor;