import React,{useState,useEffect} from 'react';
import "./admin.css";
import axios from "axios";


const Viewpatient = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await axios
        .get(`http://localhost:5000/patient/get`)
            setData(response.data);

    };

  

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




  return (
    <>
    <h1 class="heading">View Patient Details</h1>
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
                    <th style={{textAlign:"left"}}>Mobile</th>
                    <th style={{textAlign:"left"}}>Blood Group</th>
                    <th style={{textAlign:"left"}}>Patient Type</th>
                    <th style={{textAlign:"left"}}>Allergy To</th>
                    <th style={{textAlign:"left"}}>Disease</th>
                    <th style={{textAlign:"left"}}>Referred By</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.patientid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.mobile}</td>
                            <td>{item.bg}</td>
                            <td>{item.patienttype}</td>
                            <td>{item.allergy}</td>
                            <td>{item.disease}</td>
                            <td>{item.doctorname}</td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
        </>
  );
};
export default Viewpatient;