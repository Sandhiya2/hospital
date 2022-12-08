import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  patientid :"",
  doctorid :"",
  labid : "",
  consultdate : "",
  amount : "",
};

const Outpatient = ({patient,doctor,lab}) => {

  console.log(patient)
  console.log(doctor)
  console.log(lab)

  const [state, setState]= useState(initialState);

  const {patientid,doctorid,labid,consultdate,amount} = state;

  const navigate = useNavigate();

  const {outid} = useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/out/get/${outid}`)
    .then((resp) => setState({...resp.data[0]}));
}, [outid]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!patientid || !doctorid || !consultdate || !amount){
          toast.error("All fields are Necessary");
      }else{
        if(!outid){
            axios.post("http://localhost:5000/out/post", {
              patientid,
              doctorid,
              labid,
              consultdate,
              amount
            }).then(() => {
                setState({patientid : "",doctorid : "",labid : "",consultdate : "",amount : ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Outpatient details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/out/updateout/${outid}`, {
            patientid,
            doctorid,
            labid,
            consultdate,
            amount
          }).then(() => {
              setState({patientid : "",doctorid : "",labid : "",consultdate : "",amount : ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate("/admin/main/outpatient"), 500);
        }
      };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};

const [data, setData] = useState([]);

const loadData = async () => {
  const response = await axios.get("http://localhost:5000/out/get");
  setData(response.data);
};

useEffect(() => {
  loadData();
}, []);

const deleteout = (outid) => {
  if(window.confirm("Are you sure that you want to Delete?")) {
      axios.delete(`http://localhost:5000/out/remove/${outid}`);
      toast.success("Outpatient details Deleted Sucessfully");
      setTimeout(() => loadData(), 500);
  }
};

    return (
      <div className='adddepart'>
        <h1>Outpatient Registration</h1><br></br>
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
                    patient.map((optid,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={optid.patientid}>{optid.name}</option>
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
                    doctor.map((odtid,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={odtid.doctorid}>{odtid.doctorname}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select></td></tr>
              <tr>
  <td><label >Lab Test:</label></td>
        <td> <select required name="labid" id="labid"  onChange={handleInputChange}>
                  <option>Test if any</option>
                  {
                    lab.map((oltid,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={oltid.labid}>{oltid.category}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select></td></tr>
        <tr>
  <td><label >Consult Date :</label></td>
  <td><input type="date" name="consultdate" id="consultdate" value={consultdate || ""} onChange={handleInputChange} /></td></tr>
  <tr>
  <td><label >Consult Amount :</label></td>
        <td><input type="number" name='amount' id="amount" value={amount || ""} onChange={handleInputChange} /></td></tr>
        <tr><td>
        <input type="submit" value={outid ? "Update" : "Add" } /></td></tr>
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
                    <th style={{textAlign:"center"}}>Lab Test</th>
                    <th style={{textAlign:"center"}}>Consult Date</th>
                    <th style={{textAlign:"center"}}>Consult Amount</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.outid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.doctorname}</td>
                            <td>{item.category}</td>
                            <td>{item.consultdate}</td>
                            <td>{item.amount}</td>
                            <td>
                                <Link to={`/admin/main/updateout/${item.outid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteout(item.outid)}>Delete</button>
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
  
  export default Outpatient;
  