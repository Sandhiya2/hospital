import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import './admin.css';

const initialState ={
roomid : "",
bedno : "",
bedstatus : ""
};

const Bedstatus = ({room}) => {


  console.log(room)

  const [state, setState]= useState(initialState);

  const {roomid,bedno,bedstatus} = state;

  const navigate = useNavigate();

  const {bedid} = useParams();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/bed/get/${bedid}`)
    .then((resp) => setState({...resp.data[0]}));
}, [bedid]);

  const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(roomid+" "+patientid+" "+bedno+" "+bedstatus)
      if(!roomid || !bedno || !bedstatus){
          toast.error("All fields are Necessary");
      }else{
        if(!bedid){
            axios.post("http://localhost:5000/bed/post", {
              roomid,
              bedno,
              bedstatus
            }).then(() => {
                setState({roomid : "",bedno : "",bedstatus : ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Bed details Added Sucessfully");
        }else{
          axios.put(`http://localhost:5000/bed/updatebed/${bedid}`, {
           roomid,
           bedno,
           bedstatus
          }).then(() => {
              setState({roomid : "",bedno : "",bedstatus : ""});
          })
          .catch((err) => toast.error(err.response.data));
          toast.success(" Updated Sucessfully");
      }
            setTimeout(() => navigate("/admin/main/bedstatus"), 500);
        }
      };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};

const [data, setData] = useState([]);

const loadData = async () => {
  const response = await axios.get("http://localhost:5000/bed/get");
  setData(response.data);
};

useEffect(() => {
  loadData();
}, []);

const deletebed = (bedid) => {
  if(window.confirm("Are you sure that you want to Delete?")) {
      axios.delete(`http://localhost:5000/bed/remove/${bedid}`);
      toast.success("Bed details Deleted Sucessfully");
      setTimeout(() => loadData(), 500);
  }
};

    return (
      <div className='adddepart'>
        <h1>Bed Enquiry</h1><br></br>
<div className='bedcontainer'>
  <div class="opcontent">
  <form onSubmit={handleSubmit}>
  <table border="0" align="center">
  <tbody>
  <tr>
  <td><label >Room:</label></td>
        <td><select required name="roomid" id="roomid"  onChange={handleInputChange}>
                  <option>Select Room</option>
                  {
                    room.map((broomid,index)=>{
                      return(
                        <React.Fragment key={index}>
                          <option value={broomid.roomid}>{broomid.roomno}</option>
                        </React.Fragment>
                      )
                    })
                  }
              </select></td></tr>
              <tr>
  <td><label >Bed No:</label></td>
        <td> <input type="text" name="bedno" id="bedno" value={bedno || ""} onChange={handleInputChange} /></td></tr>
        <tr>
  <td><label >Bed Status :</label></td>
        <td><select name="bedstatus" id="bedstatus" value={bedstatus || ""} onChange={handleInputChange} >
                  <option>--Select--</option>
                  <option>Booked</option>
                  <option>Not Booked</option>
              </select></td></tr>
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
                    <th style={{textAlign:"center"}}>Room No</th>
                    <th style={{textAlign:"center"}}>Bed No</th>
                    <th style={{textAlign:"center"}}>Bed Status</th>
                    <th style={{textAlign:"center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=> {
                    return (
                        <tr keys={item.bedid}>
                            <th scope="row">{index+1}</th>
                            <td>{item.roomno}</td>
                            <td>{item.bedno}</td>
                            <td>{item.bedstatus}</td>
                            <td>
                                <Link to={`/admin/main/updatebed/${item.bedid}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={() => deletebed(item.bedid)}>Delete</button>
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
  
  export default Bedstatus;
  