import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
  roomtype : "",
  beds : "",
  floor : "",
  roomrate : "",
  roomno : ""
};

const Roomcategory = () => {

  const [state, setState]= useState(initialState);

  const {roomtype,beds,floor,roomrate,roomno} = state;

  const navigate = useNavigate();

  const {roomid} = useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/room/get/${roomid}`)
    .then((resp) => setState({...resp.data[0]}));
}, [roomid]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!roomtype || !beds || !floor || !roomrate || !roomno){
        
          toast.error("All fields are Necessary");
      }else{
        if(!roomid){
            axios.post("http://localhost:5000/room/post", {
              roomtype,
              beds,
              floor,
              roomrate,
              roomno
            }).then(() => {
                setState({roomtype : "",beds : "",floor : "",roomrate : "",roomno : ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Room details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/room/updateroom/${roomid}`, {
            roomtype,
            beds,
            floor,
            roomrate,
            roomno 
          }).then(() => {
              setState({roomtype : "",beds : "",floor : "",roomrate : "",roomno : ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate("/admin/main/roomcategory"), 500);
        }
      };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};

const [data, setData] = useState([]);

const loadData = async () => {
  const response = await axios.get("http://localhost:5000/room/get");
  setData(response.data);
};

useEffect(() => {
  loadData();
}, []);

const deleteroom = (roomid) => {
  if(window.confirm("Are you sure that you want to Delete?")) {
      axios.delete(`http://localhost:5000/room/remove/${roomid}`);
      toast.success("Room details Deleted Sucessfully");
      setTimeout(() => loadData(), 500);
  }
};

    return (
      <div className='adddepart'>
        <h1>Room Categories</h1><br></br>
<div className='roomcontainer'>
  <div class="opcontent">
  <form onSubmit={handleSubmit}>
  <table border="0" align="center">
  <tbody>
  <tr>
  <td><label >Room Type:</label></td>
        <td><select name="roomtype" id="roomtype" value={roomtype || ""} onChange={handleInputChange} >
                  <option>--Select--</option>
                  <option>General Ward</option>
                  <option>Single Bed</option>
                  <option>Double Bed</option>
              </select></td></tr>
              <tr>
  <td><label >Room No:</label></td>
        <td> <input type="text" name="roomno" id="roomno" value={roomno || ""} onChange={handleInputChange} /></td></tr>
  <tr>
  <td><label >Total Beds:</label></td>
        <td><input type="number" name='beds' id="beds" value={beds || ""} onChange={handleInputChange} /></td></tr>
        <tr>
  <td><label >Floor :</label></td>
        <td><select name="floor" id="floor" value={floor || ""} onChange={handleInputChange} >
                  <option>--Select--</option>
                  <option>Ground Floor</option>
                  <option>1st Floor</option>
              </select></td></tr>
  <tr>
  <td><label >Room Rate :</label></td>
        <td><input type="number" name='roomrate' id="roomrate" value={roomrate || ""} onChange={handleInputChange} /></td></tr>
        <tr><td>
        <input type="submit" value={roomid ? "Update" : "Add" } /></td></tr>
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
                    <th style={{textAlign:"center"}}>Room Type</th>
                    <th style={{textAlign:"center"}}>Room No</th>
                    <th style={{textAlign:"center"}}>Beds</th>
                    <th style={{textAlign:"center"}}>Floor</th>
                    <th style={{textAlign:"center"}}>Room Rate</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.roomid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.roomtype}</td>
                            <td>{item.roomno}</td>
                            <td>{item.beds}</td>
                            <td>{item.floor}</td>
                            <td>{item.roomrate}</td>
                            <td>
                                <Link to={`/admin/main/updateroom/${item.roomid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deleteroom(item.roomid)}>Delete</button>
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
  
  export default Roomcategory;
  