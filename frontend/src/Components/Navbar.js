import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import DarkMode from './DarkMode'
import { FaShoppingCart } from "react-icons/fa";
import Modal from '../Modal';
import Cart from '../Screen/Cart';
import { useCart } from '../ContextReducer/ContextReducer';
import { toast } from 'react-toastify';


export default function Navbar() {
    const [cartView, setCartView] = useState(false)

    const navigate = useNavigate();

    const handelLogout = () => {
        toast.success('Logged out successfully!');
        setTimeout(() => {
            localStorage.removeItem('authToken');
            navigate('/login')
        }, 1000)
    }


    const loadCart = () => {
        setCartView(true)
    }

    const cartItem = useCart();
    console.log('Navbar cartItem :', cartItem)


    return (
        <div className="bg-white dark:bg-gray-900 text-orange-800 dark:text-gray-50 flex flex-wrap top-0 fixed items-center justify-between px-6 min-h-12 border-b border-gray-800 w-full max-w-screen-2xl mx-auto">
            <h1 className='text-xl uppercase font-bold '>Niwant</h1>
            <ul className='flex items-center gap-4'>
                <NavLink to={'/'}
                    className={({ isActive }) =>
                        `px-4 py-1 font-bold rounded-lg  ${isActive ? 'text-red-400 border-red-500 dark:border-red-100 border-x-2' : ''}`}>
                    Home
                </NavLink>
                <NavLink to={'/contact'} className={({ isActive }) =>
                    `px-4 py-1 font-bold rounded-lg  ${isActive ? 'text-red-400 border-red-500 dark:border-red-100 border-x-2' : ''}`}>
                    Contact
                </NavLink>
                {localStorage.getItem('authToken') ?
                    <NavLink to={'/myOrder'} className={({ isActive }) =>
                        `px-4 py-1 font-bold rounded-lg  ${isActive ? 'text-red-400 border-red-500 dark:border-red-100 border-x-2' : ''}`}>
                        My Orders
                    </NavLink>
                    : ""
                }
            </ul>
            <div className=' md:flex items-center space-x-4'>
                {localStorage.getItem('authToken') ?
                    <div className='flex items-center gap-2'>
                        <Link className='flex items-center' onClick={loadCart}>
                            <FaShoppingCart className='w-6 h-6' />
                            <span className=' text-white dark:text-red-600 font-bold bg-green-500 dark:bg-white text-xs rounded-full px-1 py-0.5'>
                                {cartItem.length}
                            </span>
                        </Link>

                        {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                        <button className='px-2 py-1 text-sm text-white font-bold border-2 border-green-200 rounded-md bg-gradient-to-tl to-green-500 from-green-300 shadow-inner 
                        hover:bg-gradient-to-tl hover:to-green-300 hover:from-green-500 shadow-green-900'
                            onClick={handelLogout}>LogOut</button>
                    </div>
                    :
                    <div className='md:flex items-center space-x-4 hidden'>
                        <Link to={'/login'} className='px-4 py-1 text-sm text-white font-bold border-2 border-green-200 rounded-md bg-gradient-to-tl to-green-500 from-green-300 shadow-inner 
                        hover:bg-gradient-to-tl hover:to-green-300 hover:from-green-500 shadow-green-900'>LogIn</Link>
                        <Link to={'/register'} className='px-4 py-1 text-sm text-white font-bold border-2 border-green-200 rounded-md bg-gradient-to-tl to-green-500 from-green-300 shadow-inner 
                        hover:bg-gradient-to-tl hover:to-green-300 hover:from-green-500 shadow-green-900'>Register</Link>
                    </div>

                }

                <DarkMode />
            </div>

        </div >
    )
}