import React from 'react'
import "./consultants.css"
import docimage from "./images/doc2.jpg"
import fdoc from "./images/doc3.png"
import mdoc from "./images/doc4.png"
import doc from "./images/doc6.jpg"
import pic from "./images/mdoc.png"
import fpic from "./images/fdoc.png"
import { Heading } from "../common/Heading"

export const Consultants=()=> {
  return (
   <>
     <Heading title='DOCTORS' />
  <ul class="doccards">
  <li>
    <p class="doccard">
      <img src={docimage} class="doccard__image" alt="" />
      <div class="doccard__overlay">
        <div class="doccard__header">
          <svg class="doccard__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <img class="doccard__thumb" src={pic} alt="" />
          <div class="doccard__header-text">
            <h3 class="doccard__title">Dr.M. Dharan MBBS</h3>            
            <span class="doccard__status">Orthopedics</span>
          </div>
        </div>
        <p class="doccard__description">Ortho Specialist</p>
      </div>
    </p>      
  </li>
  <li>
    <p class="doccard">
    <img src={fdoc} class="doccard__image" alt="" />
      <div class="doccard__overlay">        
        <div class="doccard__header">
          <svg class="doccard__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                 
          <img class="doccard__thumb" src={fpic} alt="" />
          <div class="doccard__header-text">
            <h3 class="doccard__title">Dr. S.Parkavi MBBS </h3>
            <span class="doccard__status">Cardiologist</span>
          </div>
        </div>
        <p class="doccard__description">Cardiothoracic & Vascular Surgeon</p>
      </div>
    </p>
  </li>
  <li>
    <p class="doccard">
      <img src={mdoc} class="doccard__image" alt="" />
      <div class="doccard__overlay">
        <div class="doccard__header">
          <svg class="doccard__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <img class="doccard__thumb" src={fpic} alt="" />
          <div class="doccard__header-text">
            <h3 class="doccard__title">Dr.S.R.Poornima</h3>         
            <span class="doccard__status">General</span>
          </div>
        </div>
        <p class="doccard__description">General Care</p>
      </div>
    </p>
  </li>
  <li>
    <p class="doccard">
      <img src={doc} class="doccard__image" alt="" />
      <div class="doccard__overlay">
        <div class="doccard__header">
          <svg class="doccard__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                 
          <img class="doccard__thumb" src={pic} alt="" />
          <div class="doccard__header-text">
            <h3 class="doccard__title">Dr. S.M Harshath</h3>
            <span class="doccard__status">Endocrinologist & Diabetologist</span>
          </div>          
        </div>
        <p class="doccard__description">Endocrinologist & Diabetologist</p>
      </div>
    </p>
  </li>    
</ul>
   </>
  )
}
