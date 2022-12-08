import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  patientid :"",
  roomid :"",
  bedid : "",
  labid : "",
  admi_date : "",
  dis_date : "",
};

const Inpatient = ({patient,room,bed,lab}) => {

  console.log(patient)
  console.log(room)
  console.log(bed)
  console.log(lab)

  const [state, setState]= useState(initialState);

  const {patientid,roomid,bedid,labid,admi_date,dis_date} = state;

  const navigate = useNavigate();

  const {inid} = useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/in/get/${inid}`)
    .then((resp) => setState({...resp.data[0]}));
}, [inid]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!patientid || !roomid || !bedid || !labid || !admi_date || !dis_date){
        console.log(patientid+ " " +roomid+ " " +bedid+ " " +labid+ " " +admi_date+ " " +dis_date)
          toast.error("All fields are Necessary");
      }else{
        if(!inid){
            axios.post("http://localhost:5000/in/post", {
              patientid,
              roomid,
              bedid,
              labid,
              admi_date,
              dis_date
            }).then(() => {
                setState({patientid : "",roomid : "",bedid : "",labid : "",admi_date : "",dis_date : ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Inpatient details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/in/updatein/${inid}`, {
            patientid,
            roomid,
            bedid,
            labid,
            admi_date,
            dis_date
          }).then(() => {
              setState({patientid : "",roomid : "",bedid : "",labid : "",admi_date : "",dis_date : ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate("/admin/main/inpatient"), 500);
        }
      };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};

const [data, setData] = useState([]);

const loadData = async () => {
  const response = await axios.get("http://localhost:5000/in/get");
  setData(response.data);
};

useEffect(() => {
  loadData();
}, []);

const deleteout = (inid) => {
  if(window.confirm("Are you sure that you want to Delete?")) {
      axios.delete(`http://localhost:5000/in/remove/${inid}`);
      toast.success("Inpatient details Deleted Sucessfully");
      setTimeout(() => loadData(), 500);
  }
};

    return (
      <div className='adddepart'>
        <h1>Inpatient Details</h1><br></br>
<div className='incontainer'>
  <div class="opcontent">
  <form onSubmit={handleSubmit}>
  <table border="0" align="center">
  <tbody>
  <tr>
  <td><label >Patient Name:</label></td>
        <td> <select required name="patientid" id="patientid"  onChange={handleInputChange}>
                  <option>Select Patient</option>
                  {
                    patient.map((inpid,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={inpid.patientid}>{inpid.name}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select></td></tr>
  <tr>
  <td><label >Room :</label></td>
        <td> <select required name="roomid" id="roomid"  onChange={handleInputChange}>
        <option>Select Room</option>
                  {
                    room.map((inroom,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={inroom.roomid}>{inroom.roomno}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select></td></tr>
              <tr>
  <td><label >Bed No:</label></td>
        <td> <select required name="bedid" id="bedid"  onChange={handleInputChange}>
                  <option>Select Bed</option>
                  {
                    bed.map((inbed,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={inbed.bedid}>{inbed.bedno}</option>
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
                    lab.map((inlab,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={inlab.labid}>{inlab.category}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select></td></tr>
        <tr>
  <td><label >Admission Date :</label></td>
  <td><input type="date" name="admi_date" id="admi_date" value={admi_date || ""} onChange={handleInputChange} /></td></tr>
  <tr>
  <td><label >Discharge Date :</label></td>
  <td><input type="date" name="dis_date" id="dis_date" value={dis_date || ""} onChange={handleInputChange} /></td></tr>
        <tr><td>
        <input type="submit" value={inid ? "Update" : "Add" } /></td></tr>
        </tbody>
        </table>
      </form>
      </div>
</div>
<div className='viewroom'>
    <div className='inouterbox'>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>No.</th>
                    <th style={{textAlign:"center"}}>Patient Name</th>
                    <th style={{textAlign:"center"}}>Room No</th>
                    <th style={{textAlign:"center"}}>Bed No</th>
                    <th style={{textAlign:"center"}}>Lab Test</th>
                    <th style={{textAlign:"center"}}>Admission Date</th>
                    <th style={{textAlign:"center"}}>Discharge Date</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.inid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.roomno}</td>
                            <td>{item.bedno}</td>
                            <td>{item.category}</td>
                            <td>{item.admi_date}</td>
                            <td>{item.dis_date}</td>
                            <td>
                                <Link to={`/admin/main/updatein/${item.inid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteout(item.inid)}>Delete</button>
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
  
  export default Inpatient;
  