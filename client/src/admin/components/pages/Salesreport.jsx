import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import axios from 'axios';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const colums = [
  {field:"saleid", headerName:"Sales Id",width:50},
  {field:"patientid", headerName:"Id",width:50},
  {field:"name", headerName:"Patient",width:150},
  {field:"medicinename", headerName:"Medicine",width:150},
  {field:"quantity", headerName:"Quantity",width:100},
  {field:"medicineamt", headerName:"Amount",width:100},
]
const Inreport = () => {

  const [data, setData] = useState([]);

  const loadData = useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/sales/salereport");
    setData(response.data);
  },[setData])

  useEffect(()=>{
    loadData();
  },[loadData])

    return (
      <div className="dataTable">
         <h1>Medicine Sales Report</h1>
          <DataGrid 
        rows={data}
        columns={colums}
        getRowId = {(row)=>row.saleid}
        components={{Toolbar:GridToolbar}}
      />
    </div> 
    );
  };
  
  export default Inreport;
  