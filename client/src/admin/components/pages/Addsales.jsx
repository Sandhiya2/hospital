import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  patientid :"",
  mediid :"",
  quantity : "",
  medicineamt : "",
};

const Addsales = ({patient,medicine}) => {

  console.log(patient)
  console.log(medicine)

  const [state, setState]= useState(initialState);

  const {patientid,mediid,quantity,medicineamt} = state;

  const navigate = useNavigate();

  const {saleid} = useParams();

  console.log(patientid)
  console.log(mediid)
  
  useEffect(() => {
    axios.get(`http://localhost:5000/sales/get/${saleid}`)
    .then((resp) => setState({...resp.data[0]}));
}, [saleid]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!patientid || !mediid || !quantity){
        console.log(patientid+ "" +mediid+ "" +quantity+ "" +medicineamt)
          toast.error("All fields are Necessary");
      }else{
        if(!saleid){
            axios.post("http://localhost:5000/sales/post", {
              patientid,
              mediid,
              quantity,
              medicineamt
          }).then(() => {
                setState({patientid : "",mediid : "", quantity : "", medicineamt : ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Sales details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/sales/updatesales/${saleid}`, {
            patientid,
            mediid,
            quantity,
            medicineamt
          }).then(() => {
              setState({patientid : "",mediid : "", quantity : "", medicineamt : ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate ("/admin/main/addsales"), 200);
        }
      };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};

const [data, setData] = useState([]);

const loadData = async () => {
    const response = await axios.get("http://localhost:5000/sales/get");
    setData(response.data);
};

useEffect(() => {
    loadData();
}, []);

console.log(data);
const deleteSales = (saleid) => {
    if(window.confirm("Are you sure that you want to Delete?")) {
        axios.delete(`http://localhost:5000/sales/remove/${saleid}`);
        toast.success("Sales details Deleted Sucessfully");
        setTimeout(() => loadData(), 500);
    }
};

    return (
      <>
      <div className='addpatient'>
        <h1>Medicine Sales Management</h1>
        <div className='medcontainer'>
  <div class="opcontent">
      <form onSubmit={handleSubmit}>
      <table border="0" align="center">
     <tbody>
     <tr>
     <td><label >Patient Name:</label></td>
     <td><select required name="patientid" id="patientid"  onChange={handleInputChange}>
                  <option>Select Patient</option>
                  {
                    patient.map((ptn,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={ptn.patientid}>{ptn.name}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select></td></tr>
              <tr>
  <td><label >Medicine Name:</label></td>
              <td><select required name="mediid" id="mediid"  onChange={handleInputChange}>
                  <option>Select Medicine</option>
                  {
                    medicine.map((med,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={med.mediid}>{med.medicinename}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select>
              </td></tr>
              <tr>
  <td><label >Quantity:</label></td>
            <td><input type="number" name="quantity" id="quantity" value={quantity || ""} onChange={handleInputChange} /></td></tr>
            <tr>
  <td><label >Amount:</label></td>
              <td><input type="number" name="medicineamt" id="medicineamt" value={medicineamt || ""} onChange={handleInputChange} /></td></tr>
              <tr><td>
          <input type="submit" value={saleid ? "Update" : "Add" } /></td></tr>
          </tbody>
        </table>
        </form>
      </div>
      </div>
    </div>
    <div className='medouterbox'>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"left"}}>No.</th>
                    <th style={{textAlign:"left"}}>Patient Name</th>
                    <th style={{textAlign:"left"}}>Medicine Name</th>
                    <th style={{textAlign:"left"}}>Quantity</th>
                    <th style={{textAlign:"left"}}>Amount</th>
                    <th style={{textAlign:"left"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.saleid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.medicinename}</td>
                            <td>{item.quantity}</td>
                            <td>{item.medicineamt}</td>
                            <td>
                                <Link to={`/admin/main/updatesales/${item.saleid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteSales(item.saleid)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
    </>
    );
  };
  
  export default Addsales;
  