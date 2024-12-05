import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="h-16 bg-gray-500 flex justify-between items-center px-20 fixed top-0 left-0 w-full ">
            <Link to="/" className="text-3xl text-blue-400 font-bold">Zunzo</Link>
            <nav className="flex justify-center">
                <ul className="flex flex-row gap-10">
                    <li className="text-lg text-white hover:text-blue-400 transition duration-300">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-lg text-white hover:text-blue-400 transition duration-300">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="text-lg text-white hover:text-blue-400 transition duration-300">
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className="text-lg text-white hover:text-blue-400 transition duration-300">
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
            </nav>
            <div className="text-lg text-white">
                User info
            </div>
        </div>
    )
}

export default NavBar