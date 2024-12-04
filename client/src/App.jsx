import { useState } from 'react'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import './App.css'
import { BrowserRouter as Router , Route , Routes} from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
