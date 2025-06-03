import React, { useEffect, useState } from 'react'
import { IoMdSunny, IoMdMoon } from "react-icons/io";


export default function DarkMode() {

    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
    const element = document.documentElement;

    useEffect(() => {
        if (theme === 'dark') {
            element.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            element.classList.remove('dark');
            localStorage.setItem('theme', 'light')
        }
    }, [theme, element])

    return (
        <>
            <div className='relative inline-flex'>
                <IoMdSunny className={`bg-white cursor-pointer border-2 border-orange-400 shadow-inner shadow-black text-orange-500 rounded-full w-8 h-8 p-1.5 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'} transition-all duration-500 ease-in-out `}
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
                <IoMdMoon className={`bg-white cursor-pointer border-2 border-purple-500 shadow-inner shadow-black text-purple-700  absolute rounded-full w-8 h-8 p-1.5 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'} transition-all duration-500 ease-in-out`}
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            </div>
        </>
    )
}
