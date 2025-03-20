
import { CardSpotlight } from "./components/CardSpotlight"
import Footer from "./components/Footer"
import FreeBooks from "./components/FreeBooks"
import Hero from "./components/Hero"
import { LampDemo } from "./components/LampDemo"
import Navbar from "./components/Navbar"
import React from "react"



function App() {
  

  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      {/* <FreeBooks></FreeBooks>  */}
      {/* <LampDemo></LampDemo>  */}
      <CardSpotlight></CardSpotlight>
      
      <Footer></Footer>
    </>
  )
}

export default App
