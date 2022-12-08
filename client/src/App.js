import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pages } from "./components/pages/Pages"
import Admin from "./admin/App"
import Doctor from "./doctor/App"
import { useEffect } from "react"

//npm install --save aos@next
//aos
import AOS from "aos"
import "aos/dist/aos.css"

function App() {
  //aos
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])
  return (
    <>

<BrowserRouter>
    <div className="App">

      <Routes>
        <Route path="/*" element={<Pages />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/doctor/*" element={<Doctor />} />
      </Routes>
    </div>
    </BrowserRouter>
      
    </>
  )
}

export default App
