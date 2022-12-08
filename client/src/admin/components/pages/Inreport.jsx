import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {toast} from "react-toastify";

const Inreport = () => {

  const [from,setFrom] = useState("");
  const [to,setTo] = useState("");
  const [data,setData] = useState([]);

  const handleSubmit = (e) =>{
   e.preventDefault();
   const date = new Date();
   const today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+String(date.getDate());
   console.log(today);
   if(from>today)
       toast.error("From Date Should not be greater than today");
   else if(from>to)
       toast.error("From date should not be greater than to date");
   else{
           axios.get(`http://localhost:5000/in/report/${from}/${to}`).then((response)=>{
               console.log(response.data)
               setData(response.data)
           }).catch((err)=>{
               toast.error(err.body.data)
           })
   }
}

useEffect(()=>{
setData(data)},
[data,setData]
)

const colums = [
 {field:"inid", headerName:"Id",width:50},
 {field:"name", headerName:"Patient",width:100},
 {field:"roomno", headerName:"Room No",width:100},
 {field:"bedno", headerName:"Bed No",width:110},
 {field:"category", headerName:"Category",width:130},
 {field:"admi_date", headerName:"Admission date",width:200},
 {field:"dis_date", headerName:"Discharge date",width:200},
]

    return (
      <div className='report'>
      <form className="form" onSubmit={handleSubmit}>
          <div className="formInput">
            <pre>
              <label htmlFor="from">From:</label>
                  <input type="date" name="from" id="from" value={from || ""} onChange={(e)=>{setFrom(e.target.value)}}/>
              <label htmlFor="to">To:</label>
                  <input type="date" name="to" id="to" value={to || ""} onChange={(e)=>{setTo(e.target.value)}} />
                  </pre>
          </div>
          <button type="submit" className="btn2">submit</button>
      </form>
      <div className="dataTable">
         <h1>Inpatient Report</h1>
          <DataGrid 
        rows={data}
        columns={colums}
        getRowId = {(row)=>row.inid}
        components={{Toolbar:GridToolbar}}
      />
    </div> 
        </div>
    );
  };
  
  export default Inreport;
  