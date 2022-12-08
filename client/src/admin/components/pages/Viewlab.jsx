import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./admin.css";
import {toast} from "react-toastify";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const Viewlab = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/lab/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    console.log(data);
const deleteLab = (labid) => {
        if(window.confirm("Are you sure that you want to Delete?")) {
            axios.delete(`http://localhost:5000/lab/remove/${labid}`);
            toast.success("Lab details Deleted Sucessfully");
            setTimeout(() => loadData(), 500);
        }
    };
  return (
    <>
    <h1 class="heading">Manage Lab Details</h1>
    <div className='outerbox'>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"left"}}>No.</th>
                    <th style={{textAlign:"left"}}>Patient Name</th>
                    <th style={{textAlign:"left"}}>Doctor Name</th>
                    <th style={{textAlign:"left"}}>Test Date</th>
                    <th style={{textAlign:"left"}}>Category</th>
                    {/* <th style={{textAlign:"left"}}>Test Report</th> */}
                    <th style={{textAlign:"left"}}>Amount</th>
                    <th style={{textAlign:"left"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.labid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.doctorname}</td>
                            <td>{item.testdate}</td>
                            <td>{item.category}</td>
                            {/* <td><img src={require(`./images/${item.report}`)} alt={item.report} width={50} height={50}/></td> */}
                            <td>{item.testamount}</td>
                            <td>
                                <Link to={`/admin/main/updatelab/${item.labid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteLab(item.labid)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
            <Link to="/admin/main/lab">
        <button className='btn btn-contact'><FaPlus />Add</button>
        </Link>
        </div>
        </>
  );
};
export default Viewlab;