import React from 'react'
import "./departments.css"
import neuro from "./images/neuro.png"
import uro from "./images/uro.png"
import gyno from "./images/gyno.png"
import cardio from "./images/cardio.png"
import general from "./images/general.png"
import medi from "./images/medi.png"
import ortho from "./images/ortho.png"
import spine from "./images/spine.png"
import diabetic from "./images/diabetic.png"
export const Departments=()=> {
  return (
   <>
   <div class="cards2">
  <div class="card2" data-aos='flip-left'>
    <h2 class="card2-title">Neurology</h2>
    <img src={neuro} alt="" />
    <p class="card2-desc">Department of Neurology offers specialized treatment for all neurological disorders with a team of experienced expert neurologists.
    The department is well equipped with all advanced diagnostic and therapeutic like, EEG with brain mapping and CT-scan .
</p>
  </div>
  <div class="card2" data-aos='flip-right'>
    <h2 class="card2-title">Cardiology</h2>
    <img src={cardio} alt="" />
    <p class="card2-desc">The Department of Cardiology offer quality and affordable medical care at the hands of committed and competent health care professionals. We have Heart team approach to choose ideal therapy in the given situation keeping in mind not only the disease but also the comorbidities, age, family needs and expectations.</p>
  </div>
  <div class="card2" data-aos='flip-left'>
    <h2 class="card2-title">Gynecology</h2>
    <img src={gyno} alt="" />
    <p class="card2-desc">The Department of Gynaecology aim to provide the best in Womens’ Health care. Our team is a dedicated and self contained unit which ensures that all the women health needs are met under one roof in a comfortable and a friendly environment.</p>
  </div>
</div>
<div class="cards2">
<div class="card2" data-aos='flip-left'>
    <h2 class="card2-title">Urology</h2>
    <img src={uro} alt="" />
    <p class="card2-desc">The Department of Urology offers complete outpatient and inpatient services related to the male and female urinary tract and the male reproductive system. 
    The treatment methods and medications prescribed by our urologists are based on the health report of the individual’s reproductive system.</p>
  </div>
  <div class="card2" data-aos='flip-right'>
    <h2 class="card2-title">Diabetology</h2>
    <img src={diabetic} alt="" />
    <p class="card2-desc">Our Diabetes department is equipped with the leading diabetic and sugar doctors to diagnose and provide the best diabetic treatment.</p>
  </div>
  <div class="card2" data-aos='flip-right'>
    <h2 class="card2-title">Spine Surgery</h2>
    <img src={spine} alt="" />
    <p class="card2-desc">The Orthopaedic Spine Surgery Division provides a best spine surgery with latest diagnostic and surgical equipments. </p>
  </div>
</div>
<div class="cards2">
  <div class="card2" data-aos='flip-left'>
    <h2 class="card2-title">Orthopaedics</h2>
    <img src={ortho} alt="" />
    <p class="card2-desc">The Department of Orthopedic provides expert medical and surgical treatment for the spectrum of conditions, from minor injuries to complex trauma, hip, knee, spine, hand or bone surgeries. Our team consists of well qualified orthopedic surgeons, 
    trained in various specialties at renowned institutes and therapists focused on providing individualized passionate care with utmost comfort to the patients in outpatient and inpatient settings.</p>
  </div>
  <div class="card2" data-aos='flip-left'>
    <h2 class="card2-title">General Surgery</h2>
    <img src={general} alt="" />
    <p class="card2-desc">The Department of General Surgery provides comprehensive surgical services. Elective and emergency surgical procedures are performed by our general surgeons throughout the year. All Benign and Malignant diseases are scientifically managed. </p>
  </div>
  <div class="card2" data-aos='flip-left'>
    <h2 class="card2-title"> Emergency Medicine</h2>
    <img src={medi} alt="" />
    <p class="card2-desc">The Emergency Department has a deep routed commitment in providng ethical service without compromising quality and patient safety. An exclusive medical specialty that treats injuries and illnesses that require immediate attention. </p>
  </div>
</div>
   </>
  )
}
