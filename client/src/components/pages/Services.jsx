import React, {useState, useEffect} from 'react';
import {useParams } from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import { Heading } from "../common/Heading"
import { services } from "../data/dummydata"

const initialState ={
  fullname : "",
  mobile : "",
  email : "",
  date : "",
  time : "",
  depart : "",
  doctor : "",
  message : ""
};

export const Services = () => {
  const [state, setState]= useState(initialState);

  const {fullname,mobile,email,date,time,depart,doctor,message} = state;


  const {appid} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/appointment/get/${appid}`)
    .then((resp) => setState({...resp.data[0]}));
}, [appid]);

const handleSubmit = (e) => {
  e.preventDefault();
  if(!fullname || !mobile || !email || !date || !depart){
    
      toast.error("All fields are Necessary");
  }else{
    if(!appid){
        axios.post("http://localhost:5000/appointment/post", {
          fullname,
          mobile,
          email,
          date,
          time,
          depart,
          doctor,
          message
        }).then(() => {
            setState({roomtype : "",beds : "",floor : "",roomrate : "",roomno : ""});
        })
        .catch((err) => toast.error(err.response.data));
        toast.success("Appointment booked Sucessfully");
    }
  };
};

const handleInputChange = (e) => {
  const {name, value} = e.target;
  setState({...state, [name]: value});
};

const [setData] = useState([]);

const loadData = async () => {
const response = await axios.get("http://localhost:5000/appointment/get");
setData(response.data);
};

useEffect(() => {
loadData();
}, []);

  return (
    <>
      <Heading title='DEPARTMENTS' />
      <section className='services'>
        <div className='container'>
          <div className='content grid3'>
            {services.map((item) => (
              <div className='box' data-aos='flip-left'>
              <div className='img' data-aos='fade-up'>
                <img src={item.cover} alt='' /> 
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section><br></br>
      <Heading title='BOOK AN APPOINTMENT' />
      <section className='testimonal padding'>
      <div class="formbold-main-wrapper">
  <div class="formbold-form-wrapper">
    <form onSubmit={handleSubmit}>
      <div class="formbold-mb-5">
        <label for="name" class="formbold-form-label"> Full Name </label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={fullname || ""}
          placeholder="Full Name"
          class="formbold-form-input"
          onChange={handleInputChange}
        />
      </div>
      <div class="formbold-mb-5">
        <label for="phone" class="formbold-form-label"> Phone Number </label>
        <input
          type="number"
          name="mobile"
          id="mobile"
          value = {mobile || ""}
          placeholder="Enter your phone number"
          class="formbold-form-input"
          onChange={handleInputChange}
        />
      </div>
      <div class="formbold-mb-5">
        <label for="email" class="formbold-form-label"> Email Address </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email || ""}
          placeholder="Enter your email"
          class="formbold-form-input"
          onChange={handleInputChange}
        />
      </div>
      <div class="flex flex-wrap formbold--mx-3">
        <div class="w-full sm:w-half formbold-px-3">
          <div class="formbold-mb-5 w-full">
            <label for="date" class="formbold-form-label"> Date </label>
            <input
              type="date"
              name="date"
              id="date"
              value={date || ""}
              class="formbold-form-input"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div class="w-full sm:w-half formbold-px-3">
          <div class="formbold-mb-5">
            <label for="time" class="formbold-form-label"> Time </label>
            <input
              type="time"
              name="time"
              id="time"
              value = {time || ""}
              class="formbold-form-input"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div class="flex flex-wrap formbold--mx-3">
        <div class="w-full sm:w-half formbold-px-3">
          <div class="formbold-mb-5 w-full">
            <label for="depart" class="formbold-form-label">Choose Department </label>
            <select name="depart" id="depart" value={depart || ""}class="formbold-form-input" onChange={handleInputChange}>
                  <option>--Select--</option>
                  <option>Neurology</option>
                  <option>Cardiology</option>
                  <option>Diabetology</option>
                  <option>Gynecology</option>
                  <option>Orthopedics</option>
                  <option>General</option>
              </select>
          </div>
        </div>
        <div class="w-full sm:w-half formbold-px-3">
          <div class="formbold-mb-5">
            <label for="doctor" class="formbold-form-label">Choose Doctor</label>
            <select name="doctor" id="doctor" value ={doctor || ""}class="formbold-form-input" onChange={handleInputChange}>
                  <option>--Select--</option>
                  <option>Dharan</option>
                  <option>Parkavi</option>
                  <option>Sandhiya</option>
                  <option>Harshath</option>
                  <option>Poornima</option>
              </select>
          </div>
        </div>
      </div>
      <div class="formbold-mb-5">
        <label for="message" class="formbold-form-label"> Message </label>
        <textarea rows={5} cols={65} 
          name="message"
          id="message"
          value={message || ""}
          placeholder="Enter your Message"
          class="formbold-form-input"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input type="submit" value={appid ? "Update" : "Book Appointment" } class="formbold-btn"/>
      </div>
    </form>
  </div>
</div>
      </section>
    </>
  )
}
