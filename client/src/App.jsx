import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import { BrowserRouter as Router , Route , Routes} from "react-router-dom";
import NavBar from './components/NavBar.jsx';
function App() {
  return (
    <>
      {/* <h2 className='text-3xl font-bold underline' >Home page</h2> */}
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
    </>
  )
}

export default App
