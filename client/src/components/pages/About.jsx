import React from "react"
import { Heading } from "../common/Heading"
import { about } from "../data/dummydata"

export const About = () => {
  return (
    <>
       <section className='about'>
        <div className='container flexsb'>
          <div className='left row'>
            <img src='./images/about.jpg' alt='' />
          </div>
          <div className='right row'>
            <div className='items'>
            <Heading title='Our Vission and Mission' />
              {about.map((val) => {
                return (
                  <div className='item flexSB'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
