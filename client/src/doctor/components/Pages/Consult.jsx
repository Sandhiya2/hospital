import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  patientid :"",
  doctorid :"",
  disease : "",
  prescription : "",
};

const Consult = ({patient,doctor}) => {

  console.log(patient)
  console.log(doctor)

  const [state, setState]= useState(initialState);

  const {patientid,doctorid,disease,prescription} = state;

  const navigate = useNavigate();

  const {consultid} = useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/consult/get/${consultid}`)
    .then((resp) => setState({...resp.data[0]}));
}, [consultid]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!patientid || !doctorid ){
          toast.error("All fields are Necessary");
      }else{
        if(!consultid){
            axios.post("http://localhost:5000/consult/post", {
              patientid,
              doctorid,
              disease,
              prescription
            }).then(() => {
                setState({patientid : "",doctorid : "",disease : "",prescription : ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Consult details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/consult/updateconsult/${consultid}`, {
            patientid,
            doctorid,
            disease,
            prescription
          }).then(() => {
              setState({patientid : "",doctorid : "",disease : "",prescription : ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate("/doctor/main/addconsult"), 500);
        }
      };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};

const [data, setData] = useState([]);

const loadData = async () => {
  const response = await axios.get("http://localhost:5000/consult/get");
  setData(response.data);
};

useEffect(() => {
  loadData();
}, []);

const deleteconsult = (consultid) => {
  if(window.confirm("Are you sure that you want to Delete?")) {
      axios.delete(`http://localhost:5000/consult/remove/${consultid}`);
      toast.success("Consult details Deleted Sucessfully");
      setTimeout(() => loadData(), 500);
  }
};

    return (
      <div className='adddepart'>
        <h1>Consult Details</h1><br></br>
<div className='roomcontainer'>
  <div class="opcontent">
  <form onSubmit={handleSubmit}>
  <table border="0" align="center">
  <tbody>
  <tr>
  <td><label >Patient Name:</label></td>
        <td> <select required name="patientid" id="patientid"  onChange={handleInputChange}>
                  <option>Select Patient</option>
                  {
                    patient.map((cptid,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={cptid.patientid}>{cptid.name}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select></td></tr>
  <tr>
  <td><label >Referred By:</label></td>
        <td> <select required name="doctorid" id="doctorid"  onChange={handleInputChange}>
                  <option>Select Doctor</option>
                  {
                    doctor.map((cdtid,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={cdtid.doctorid}>{cdtid.doctorname}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select></td></tr>
              <tr>
  <td><label >Disease:</label></td>
        <td> <select required name="disease" id="disease"  onChange={handleInputChange}>
                  <option>Disease</option>
                  <option>Head Pain</option>
                  <option>Stomach Ache</option>
                  <option>Viral Fever</option>
                  <option>Typhoid</option>
                  {/* {
                    patient.map((cptid,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={cptid.patientid}>{cptid.disease}</option>
                        </React.Fragment>
                      )
                    })
                  } */}
              </select></td></tr>
        <tr>
  <td><label >Prescription :</label></td>
  <td><textarea name="prescription" id="prescription" value={prescription || ""} rows="4" cols="50" onChange={handleInputChange} /></td></tr>
        <tr><td>
        <input type="submit" value={consultid ? "Update" : "Add" } /></td></tr>
        </tbody>
        </table>
      </form>
      </div>
</div>
<div className='viewroom'>
    <div className='roomouterbox'>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>No.</th>
                    <th style={{textAlign:"center"}}>Patient Name</th>
                    <th style={{textAlign:"center"}}>Referred By</th>
                    <th style={{textAlign:"center"}}>Disease</th>
                    <th style={{textAlign:"center"}}>Prescription</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.consultid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.doctorname}</td>
                            <td>{item.disease}</td>
                            <td>{item.prescription}</td>
                            <td>
                                <Link to={`/doctor/main/updateconsult/${item.consultid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteconsult(item.consultid)}>Delete</button>
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
  
  export default Consult;
  