import React from "react"
import Footer from "../common/Footer"
import { Header } from "../common/Header"
import { Home } from "../home/Home"
import { About } from "./About"
import { Aboutus } from "./Aboutus"
import { Blog } from "./Blog"
import { Contact } from "./Contact"
import { Portfolio } from "./Portfolio"
import { Services } from "./Services"
import { Testimonials } from "./Testimonials"
import { Departments } from "./Departments"
import { Facilities } from "./Facilities"
import { Consultants } from "./Consultants"
import { Signup } from "./Signup"
import {Route,Routes } from "react-router-dom"
export const Pages = () => {
  return (
    <>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/aboutus' element={<Aboutus/>} />
          <Route path='/services' element={<Services/>} />
          <Route path='/portfolio' element={<Portfolio/>} />
          <Route path='/testimonials' element={<Testimonials/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/departments' element={<Departments/>} />
          <Route path='/facilities' element={<Facilities/>} />
          <Route path='/consultants' element={<Consultants/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
        <Footer />
    </>
  )
}
