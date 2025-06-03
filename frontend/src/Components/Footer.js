import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='bottom-0 fixed bg-gray-900 w-full max-w-screen-2xl mx-auto text-white text-center'>
            <footer className="rounded-lg shadow-sm text-white bg-gray-900">
                <div className="w-full mx-auto p-3 md:flex md:items-center md:justify-between">
                    <span className="text-sm  sm:text-center">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center text-sm font-medium  sm:mt-0">
                        <li className='text-xl me-4 md:me-6 uppercase font-bold text-gray-50'>
                            <Link to={"/"}>Niwant</Link>
                        </li>
                        <li>
                            <p className="hover:underline me-4 md:me-6">About</p>
                        </li>
                        <li>
                            <p className="hover:underline me-4 md:me-6">Privacy Policy</p>
                        </li>
                        <li>
                            <p className="hover:underline me-4 md:me-6">Licensing</p>
                        </li>
                        <li>
                            <p className="hover:underline">Contact</p>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}
