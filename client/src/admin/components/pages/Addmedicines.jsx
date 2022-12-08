import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  medicinename : "",
  brand : "",
  meditype : "",
  price : "",
  stockstatus : "",
};

const Addmedicines = () => {

  const [state, setState]= useState(initialState);

  const {medicinename, brand, meditype ,price, stockstatus} = state;

  const navigate = useNavigate();

  const {mediid} = useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/medi/get/${mediid}`)
    .then((resp) => setState({...resp.data[0]}));
}, [mediid]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!medicinename || !brand || !price || !stockstatus){
          toast.error("All fields are Necessary");
      }else{
        if(!mediid){
            axios.post("http://localhost:5000/medi/post", {
              medicinename, 
              brand, 
              meditype,
              price, 
              stockstatus, 
            }).then(() => {
                setState({medicinename : "", brand : "", meditype : "",price : "", stockstatus : ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Medicine details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/medi/updatemedi/${mediid}`, {
            medicinename, 
            brand, 
            meditype,
            price, 
            stockstatus,
          }).then(() => {
              setState({medicinename : "", brand : "", meditype : "", price : "", stockstatus : ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate("/admin/main/addmedicines"), 500);
        }
      };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};

const [data, setData] = useState([]);

const loadData = async () => {
  const response = await axios.get("http://localhost:5000/medi/get");
  setData(response.data);
};

useEffect(() => {
  loadData();
}, []);

const deletemedi = (mediid) => {
  if(window.confirm("Are you sure that you want to Delete?")) {
      axios.delete(`http://localhost:5000/medi/remove/${mediid}`);
      toast.success("Medicine details Deleted Sucessfully");
      setTimeout(() => loadData(), 500);
  }
};

    return (
      <div className='adddepart'>
        <h1>Manage Medicines</h1>
        <div className='medcontainer'>
  <div class="opcontent">
  <form onSubmit={handleSubmit}>
  <table border="0" align="center">
  <tbody>
    <tr>
  <td><label >Medicine Name:</label></td>
        <td><input type="text" name='medicinename' id="medicinename" value={medicinename || ""} onChange={handleInputChange} pattern="[A-Za-z]{8-12}"/></td></tr>
  <tr>
  <td><label >Category:</label></td>
        <td><input type="text" name='brand' id="brand" value={brand || ""} onChange={handleInputChange} /></td></tr>
        <tr>
  <td><label >Type:</label></td>
        <td><input type="text" name='meditype' id="meditype" value={meditype || ""} onChange={handleInputChange} /></td></tr>      
  <tr>
  <td><label >Price :</label></td>
        <td><input type="number" name='price' id="price" value={price || ""} onChange={handleInputChange} /></td></tr>
        <tr>
  <td><label >Stock :</label></td>
        <td><input type="number" name='stockstatus' id="stockstatus" value={stockstatus || ""} onChange={handleInputChange} /></td></tr>

        <tr><td>
        <input type="submit" value={mediid ? "Update" : "Add" } /></td></tr>
        </tbody>
        </table>
      </form>
</div>
</div>
<div className='viewmedi'>

<div className='medouterbox'>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:"center"}}>No.</th>
                    <th style={{textAlign:"center"}}>Medicine Name</th>
                    <th style={{textAlign:"center"}}>Category</th>
                    <th style={{textAlign:"center"}}>Type</th>
                    <th style={{textAlign:"center"}}>Price</th>
                    <th style={{textAlign:"center"}}>Stock</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.mediid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.medicinename}</td>
                            <td>{item.brand}</td>
                            <td>{item.meditype}</td>
                            <td>{item.price}</td>
                            <td>{item.stockstatus}</td>
                            <td>
                                <Link to={`/admin/main/updatemedi/${item.mediid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deletemedi(item.mediid)}>Delete</button>
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
  
  export default Addmedicines;
  