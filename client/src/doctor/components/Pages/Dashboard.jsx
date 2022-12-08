import React from "react";
import './admin.css';
import CountUp from "react-countup"
import patient from './images/patients.png';
import booking from './images/booking.png';

const Dashboard = () => {
  
    return (
      <div className='dashboard'>
        <h1>Doctor Dashboard</h1>
        <div class="cards">
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
    </div>
</div>
    );
  };
  
  export default Dashboard;