import React,{useState,useEffect, useCallback} from 'react';
import {Link} from "react-router-dom";
import "./admin.css";
import {toast} from "react-toastify";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import {MDBPagination, MDBPaginationItem,MDBPaginationLink} from "mdb-react-ui-kit";


const Viewpatient = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLimit] = useState(4);

    const loadData = (useCallback(async(start,end,increase)=>{
        const response = await axios
        .get(`http://localhost:5000/patient/get? _start=${start}&_end=${end}`)
            for(let i=0;i<response.data.length;i++){
                response.data[0].dob = response.data[0].dob.split("T1")[0];
            }
            setData(response.data);
            setCurrentPage(currentPage + increase);

    },[setCurrentPage,setData,currentPage]))

    useEffect(() => {
        loadData(0, 4, 0);
    }, [loadData]);


  

    const handleReset = () => {
        loadData();
    };


    const handleSearch = async(e) => {
        e.preventDefault();
        return await axios
        .get(`http://localhost:5000/patient/get/${value}`)
        .then ((response) => {
            setData (response.data);
            setValue("");
        })
        .catch((err) => console.log(err));
    };
    console.log(data);

const renderPagination = () => {
    if(currentPage === 0 ) {
        return (
            <MDBPagination className='mb=0'>
                <MDBPaginationItem>
                    <MDBPaginationLink>1</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                    <input type="submit" className='btn2' value='Next' onClick={() => loadData(4, 8, 1)} />
                </MDBPaginationItem>
            </MDBPagination>
        );
    }else if(currentPage < pageLimit -1 && data.lenght === pageLimit){
        return(
            <MDBPagination className='mb=0'>
            <MDBPaginationItem>
            <MDBPaginationItem>
                <input type="submit" className='btn2' value='Prev' onClick={() => loadData( (currentPage - 1) * 4, currentPage * 4, -1 )} />
            </MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1 }</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
                <input type="submit" className='btn2' value='Next' onClick={() => loadData( (currentPage + 1) * 4, (currentPage + 2) * 4, 1)} />
            </MDBPaginationItem>
        </MDBPagination>
        );
    }else {
        return(
        <MDBPagination className='mb=0'> 
        <MDBPaginationItem>
            <input type="submit" className='btn2' value='Prev' onClick={() => loadData(4, 8, -1)} />
        </MDBPaginationItem>
        <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
        </MDBPaginationItem>
    </MDBPagination>
        );
    }
};

const deletePatient = (patientid) => {
        if(window.confirm("Are you sure that you want to Delete?")) {
            axios.delete(`http://localhost:5000/patient/remove/${patientid}`);
            toast.success("Patient details Deleted Sucessfully");
            setTimeout(() => loadData(), 500);
        }
    };
  return (
    <>
    <h1 class="heading">Manage Patient Details</h1>
    <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth:"400px",
        alignContent: "center",
    }}
    className="d-flex input-group w-auto" 
    onSubmit={handleSearch}>
        <input type="text" className='form-control2' placeholder='Search...' name='search' id='search' 
         value={value||""} onChange={(e) => {console.log(value); setValue(e.target.value)}}/>
        <input type="submit" className='btn2' value='Submit'/>
        <input type="reset" className='btn2' value='Reset' onclick={() => handleReset()} />
    </form>
    <div className='outerbox2'><br></br>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"left"}}>No.</th>
                    <th style={{textAlign:"left"}}>Patient Name</th>
                    <th style={{textAlign:"left"}}>Gender</th>
                    <th style={{textAlign:"left"}}>Mobile</th>
                    <th style={{textAlign:"left"}}>DOB</th>
                    <th style={{textAlign:"left"}}>Age</th>
                    <th style={{textAlign:"left"}}>Email</th>
                    <th style={{textAlign:"left"}}>Occupation</th>
                    <th style={{textAlign:"left"}}>Marital Status</th>
                    <th style={{textAlign:"left"}}>Blood Group</th>
                    <th style={{textAlign:"left"}}>Patient Type</th>
                    <th style={{textAlign:"left"}}>Address</th>
                    <th style={{textAlign:"left"}}>Allergy To</th>
                    <th style={{textAlign:"left"}}>Disease</th>
                    <th style={{textAlign:"left"}}>Referred By</th>
                    <th style={{textAlign:"left"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.patientid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.gender}</td>
                            <td>{item.mobile}</td>
                            <td>{item.dob}</td>
                            <td>{item.age}</td>
                            <td>{item.email}</td>
                            <td>{item.occupation}</td>
                            <td>{item.marital}</td>
                            <td>{item.bg}</td>
                            <td>{item.patienttype}</td>
                            <td>{item.address}</td>
                            <td>{item.allergy}</td>
                            <td>{item.disease}</td>
                            <td>{item.doctorname}</td>
                            <td>
                                <Link to={`/admin/main/updatepatient/${item.patientid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deletePatient(item.patientid)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
            <Link to="/admin/main/addpatient">
        <button className='btn btn-contact'><FaPlus />Add Patient</button>
        </Link>
        <div style ={{
            margin: "auto",
            padding: "10px",
            maxWidth: "400px",
            alignContent: "center",
        }}>{renderPagination()}</div>
        </div>
        </>
  );
};
export default Viewpatient;