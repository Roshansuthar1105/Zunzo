import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <div className='w-screen bg-gray-500 flex flex-row px-20 justify-evenly items-center '>
            <Link to="/" className='text-3xl text-blue-400 underline'>Zunzo</Link>
            <ul className='flex flex-row gap-10 '>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar