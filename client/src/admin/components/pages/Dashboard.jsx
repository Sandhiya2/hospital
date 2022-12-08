import React, { useState } from "react";
import './admin.css';
import CountUp from "react-countup"
import doctor from './images/doctor.png';
import patient from './images/patients.png';
import booking from './images/booking.png';
import Chart from "react-apexcharts";

const Dashboard = () => {
  
  const [state] = useState({
    options: {
      colors: ["#021726","#0A6CC2"],
      width: 600,
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ['January' ,'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November' ,'December' ],
      },
    },
    series: [
      {
        name: "Inpatient Treatements",
        data: [25, 10, 5, 22, 35, 28, 20, 8, 18, 60, 30, 50],
      },
      {
        name: "Outpatient Treatements",
        data: [60, 20, 35, 10, 40, 35, 22, 25, 70, 42, 22, 25],
      },
    ],
  });

    return (
      <div className='dashboard'>
        <h1>Admin Dashboard</h1>
        <div class="cards">
    <div class="card card-1">
      <img src={doctor} width="180" height="100" alt=" "/>
      <h3>Total Doctors</h3>
      <h1 className='count'>
      <CountUp enableScrollSpy duration={2} end={10} />
      </h1>
    </div>
    <div class="card card-2">
      <img src={patient}  width="150" height="100" alt=" "/>
      <h3>Total Patients</h3>
        <h1 className='count'>
      <CountUp enableScrollSpy duration={2} end={40} />
      </h1>
    </div>
    <div class="card card-3">
      <img src={booking}  width="130" height="90" alt=" "/>
      <h3>Appointments</h3>
      <h1 className='count'>
      <CountUp enableScrollSpy duration={2} end={4} />
      </h1>
    </div>
  </div><br></br>
  <div className="row">
  <h1 align="center">Statistical Treatement</h1><br></br>
        <div className="bar1">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="630"
          />
        </div>
        <div className="line1">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="630"
          />
        </div>
      
      </div>
</div>
    );
  };
  
  export default Dashboard;