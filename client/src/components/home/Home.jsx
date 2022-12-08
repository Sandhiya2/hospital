import React from "react"
import { About } from "../pages/About"
import { Counter } from "../pages/Counter"
import { Services } from "../pages/Services"
import { Hero } from "./Hero"

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Counter />
    </>
  )
}
