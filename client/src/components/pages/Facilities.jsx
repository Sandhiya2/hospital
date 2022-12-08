import React from 'react'
import { Facilitiesmain  } from './Facilitiesmain';
import './Facilities.css';
import Typewriter from "typewriter-effect"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import pharm from "./facilities/pharmacy.jpg"
import icu from "./facilities/icu.png"
import phy from "./facilities/phy.jpg"

const Pharmacy= () => {
  return (
      <div id="pharmacy"> 
       <h1>
              <Typewriter
                options={{
                  strings: "PHARMACY",
                  autoStart: true,
                  loop: true,
                }}
              />
              </h1>  
              <div class="page">
      <main class="content">
        <article>
         <img src={pharm} alt="" data-aos='zoom-in-down'/>
        </article>
      </main>
      <aside class="sidebar1">
        <p>The medical shop is on 24 hours working service with the storage of all medicines.<br></br> <br></br>
        The dispensing at the pharmacy counters is done by the pharmacists after carefully checking the medicines individually with the prescription.</p>
      </aside>
    </div>
      </div>
  )
}

const Laboratory= () => {
  return (
      <div id="lab">
       <h1>
              <Typewriter
                options={{
                  strings: "LABORATORIES",
                  autoStart: true,
                  loop: true,
                }}
              />
              </h1>  
              <div class="row1-container">
    <div class="box1 box-down cyan" data-aos='flip-left'>
      <h2>Pathology</h2>
      <p>The department comprises of Histopathology, Clinical Pathology, Cytology and state of the art blood bank.</p>
    </div>

    <div class="box1 red" data-aos='flip-left'>
      <h2>Labs</h2>
      <p>The Hospital is supported by very well-equipped, modern labs for Clinical Pathology, Biochemistry and Microbiology.</p>
    </div>

    <div class="box1 box-down blue" data-aos='flip-left'>
      <h2>Biochemistry</h2>
      <p>The biochemistry laboratory is equipped with modern equipments to enable clinical biochemistry, special proteins and hormones.</p>
    </div>
  </div>
  <div class="row2-container">
    <div class="box1 orange" data-aos='flip-left'>
      <h2>Microbiology</h2>
      <p>The department offers diagnostic services regarding Bacteriology, Mycobacteriology, Virology, Mycology, Immunology and Serology.</p>
    </div>
  </div>
      </div>
  )
}

const Icu= () => {
  return (
      <div id="icu">
            <h1>
              <Typewriter
                options={{
                  strings: "ICU(Intensive Care Unit)",
                  autoStart: true,
                  loop: true,
                }}
              />
              </h1>  
              <div class="container1">

  <div class="content1">
      <div class="content-overlay1"></div>
      <img class="content-image" src={icu} alt="" />
      <div class="content-details1 fadeIn-top">
        <h3>Our Intensive Care Units provide quality & timely treatment to patients with severe and life-threatening illnesses and injuries. </h3>
        <p>ICU has all state of the art equipments like multi parameter monitors, modern ventilators, non-invasive ventilators, syringe pumps, infusion pumps, sequential compression device, patient warming system and fluid warmers. CRRT, intermittent haemodialysis, portable X-ray and ECHO cardiograph machines are exclusively available.</p>
      </div>
  </div>
</div>
      </div>
  )
}

const Checkup= () => {

  return (
      <div id="checkup">
         <h1>
              <Typewriter
                options={{
                  strings: "Master Health Checkup Plans",
                  autoStart: true,
                  loop: true,
                }}
              />
              </h1>  
              <div class="contain2">
  <div class="checkup_card">
    <div class="checkbox">
      <div class="checkcontent">
        <h2>Routine Health Checkup</h2>
        <Popup trigger={<button className="popbutton"> Know More </button>} 
     position="right center">
      <ul class="checkupcard__list">
        <li>Complete Haemogram</li>
        <li>Urine Routine Examination</li>
        <li>Fasting Blood Sugar</li>
        <li>Post Prandial Blood Sugar</li>
        <li>X- Ray Chest</li>
        <li>Physician opinion</li>
        <li>Serum Cholesterol</li>
        <li>ESR</li>
        <li>ECG</li>
        <li>Serum Creatinine</li>
      </ul>
    </Popup>
      </div>
    </div>
  </div>

  <div class="checkup_card">
    <div class="checkbox">
      <div class="checkcontent">
        <h2>Master Health Checkup</h2>
        <Popup trigger={<button className="popbutton"> Know More </button>} 
     position="right center">
      <ul class="checkupcard__list">
        <li>Complete Haemogram</li>
        <li>Urine Routine Examination</li>
        <li>Fasting Blood Sugar</li>
        <li>Post Prandial Blood Sugar</li>
        <li>Ecg</li>
        <li>Esr</li>
        <li>Serum Protein</li>
        <li>Blood Urea</li>
        <li>Lipid Profile</li>
        <li>Ultrasound Abdomen</li>
        <li>X-Ray Chest</li>
        <li>ENT Opinion</li>
        <li>Dietary Counselling</li>
      </ul>
    </Popup>
      </div>
    </div>
  </div>

  <div class="checkup_card">
    <div class="checkbox">
      <div class="checkcontent">
        <h2>Diabetic Check Up</h2>
        <Popup trigger={<button className="popbutton"> Know More </button>} 
     position="right center">
      <ul class="checkupcard__list">
        <li>Complete Haemogram</li>
        <li>Urine Routine Examination</li>
        <li>Fasting Blood Sugar</li>
        <li>Post Prandial Blood Sugar</li>
        <li>Glycosylated Hb</li>
        <li>Thyroid Profile</li>
        <li>Diabetologist Opinion</li>
        <li>Blood Urea</li>
        <li>SGOT</li>
      </ul>
    </Popup>
      </div>
    </div>
  </div>
</div>
<div class="contain2">
  <div class="checkup_card">
    <div class="checkbox">
      <div class="checkcontent">
        <h2>Master Heart Checkup</h2>
        <Popup trigger={<button className="popbutton"> Know More </button>} 
     position="right center">
      <ul class="checkupcard__list">
        <li>ECHO</li>
        <li>TMT</li>
        <li>Cardiologist Opinion</li>
      </ul>
    </Popup>
      </div>
    </div>
  </div>

  <div class="checkup_card">
    <div class="checkbox">
      <div class="checkcontent">
        <h2>Basic Heart Checkup</h2>
        <Popup trigger={<button className="popbutton"> Know More </button>} 
     position="right center">
      <ul class="checkupcard__list">
        <li>ECHO / TMT</li>
        <li>Cardiologist Opinion</li>
      </ul>
    </Popup>
      </div>
    </div>
  </div>

  <div class="checkup_card">
    <div class="checkbox">
      <div class="checkcontent">
        <h2>Women Wellness Health Checkup</h2>
        <Popup trigger={<button className="popbutton"> Know More </button>} 
     position="right center">
      <ul class="checkupcard__list">
        <li>Mammogram & Ultrasound Breast</li>
        <li>Gynaecologist Opinion</li>
        <li>PAP Smear</li>
      </ul>
    </Popup>
      </div>
    </div>
  </div>
</div>
</div>
  )
}

const Physiotherapy= () => {
  return (
      <div id="physiotherapy">
             <h1>
              <Typewriter
                options={{
                  strings: "PHYSIOTHERAPY",
                  autoStart: true,
                  loop: true,
                }}
              />
              </h1>  
              <div id="contain" data-aos='zoom-in-down'>	
	
	<div class="product-details">
			<p class="information">"The department of physiotherapy focused on restoring mobility and functional 
      abilities of people who have been injured, who are recovering from any surgery or disability." </p>			
</div>
	
<div class="product-image">
	
	<img src={phy} alt=""/>

<div class="info2">
	<h2>Specialties</h2>
	<ul>
		<li>Cardiopulmonary</li>
		<li>Geriatrics</li>
		<li>Neurologic</li>
		<li>Orthopaedic</li>
    <li>Pediatrics</li>
		
	</ul>
	<h2> Services</h2>
	<ul>
		<li>Chronic pain</li>
		<li>Movement problems</li>
		<li>Various nervous treatment</li>
		<li>Rehabilitation</li>
		
	</ul>
</div>
</div>

</div>

      </div>
  )
}

export const Facilities = () => {
return (
  <div>
    <Facilitiesmain />
    <Pharmacy/>
    <Laboratory/>
    <Icu />
    <Checkup />
    <Physiotherapy />
  </div>
)
}

