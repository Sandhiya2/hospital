import React from 'react';
import { About } from "../pages/About"
import abtbanner from "./about/abt.jpg"
import Typewriter from "typewriter-effect"
import "./abt.scss"

export const Aboutus = () => {
  return (
    <>
    <div className='abouthead'>
      <img src={abtbanner} alt="about"/>
      <div class="content">
      <h1>
              <Typewriter
                options={{
                  strings: "ABOUT US",
                  autoStart: true,
                  loop: true,
                }}
              />
              </h1>  
              </div>
            </div>
       <div className='abt'>
      <div className='container flexsb'>
          <div className='left row'>
          <h1 data-aos='fade-right'>VELAN HOSPITAL</h1>
            </div>
            <div className='right row'>
              <p>We would like to bring to your kind notice that our hospital is a Multi-specialty hospital in Tirupur district for past 15 Years. Backed with a vision to offer the best in patient care and equipped with technologically advanced healthcare facilities.
              We have a team of doctors on board, including specialists are equipped with the knowledge and expertise for handling various types of medical cases. We have the facilities of 24Hrs Services for Accident & Emergency,
               Snakebite, Born Fracture and knee replacement operation, pregnancy Labour Ward, General Operation, Plastic Surgery, Diabetes Care, Heart Care, And More. </p>         
            </div>
          </div>
         <About />
    </div>
    <div class="artboard">
 <div class="card">

  <div class="card__side card__side--back">
   <div class="card__cover">
    <h4 class="card__heading">
     <span class="card__heading-span">Address</span>
    </h4>
   </div>
   <div class="card__details">
    <ul>
     <li>Velan Hospital</li>
     <li>Gandhi Road</li>
     <li>Anupparpalayam Pudur</li>
     <li>Tirupur</li>
     <li>Tamil Nadu</li>
    </ul>
   </div>
  </div>

  <div class="card__side card__side--front">
   <div class="card__theme">
    <div class="card__theme-box">
     <p class="card__title">Velan Hospital</p>
    </div>
   </div>
  </div>

 </div>
</div>

    </>
  )
}
