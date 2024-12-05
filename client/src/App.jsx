import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import { BrowserRouter as Router , Route , Routes} from "react-router-dom";
import NavBar from './components/NavBar.jsx';
import { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa";
function App() {
  const [visible, setVisible]=useState(true);
  useEffect(()=>{
    const handleScroll = () => {
      if(window.scrollY<=100){
        setVisible(false);
      }else{
        setVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[])
  return (
    <>
      {/* <h2 className='text-3xl font-bold underline' >Home page</h2> */}
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/products' element={<Product/>} />
      </Routes>
      {visible &&
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded">
        <FaArrowUp />
      </button>
      }
    </>
  )
}

export default App
