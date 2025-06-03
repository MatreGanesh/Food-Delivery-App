import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


export default function SignUp() {

    const [credentials, setCredentials] = useState({ username: '', email: '', password: '', geoLocation: '' })
    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post(`
                ${process.env.REACT_APP_API_BASE}/food_menu/register`,
                credentials // Sending the form data as the body of the POST request
            )

            console.log("Credentials: ", res.data.user);
            console.log(res)

            if (res.data.success === true) {
                toast.success('Registration successful! Please login.');
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }

        } catch (error) {
            if (error.response) {
                console.log("Validation Errors: ", error.response.data.errors[0]?.msg);
                toast.warning(error.response.data.errors[0]?.msg);
            } else {
                console.log("Internal Error: ", error.message);
            }
        }

    }

    // Method 1
    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setCredentials(
            { ...credentials, [name]: value }
        )
    }

    //Method 2
    // const onChangeValue = (e) => {
    //     const { name, value } = e.target;
    //     setCredentials(prevValue => ({
    //         ...prevValue,
    //         [name]: value
    //     }))
    // }


    return (
        <div className="flex justify-center items-center pt-8">
            <div className="w-full max-w-md p-8 dark:text-white text-gray-700 dark:bg-gray-600 dark:shadow-white bg-white rounded-lg shadow-black shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handelSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            id="username"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-800"
                            required
                            onChange={onChangeValue}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            id="email"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-800"
                            required
                            onChange={onChangeValue}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            id="password"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-800"
                            required
                            onChange={onChangeValue}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="geoLocation" className="block text-sm font-medium">Address</label>
                        <input
                            type="text"
                            name="geoLocation"
                            value={credentials.geoLocation}
                            id="geoLocation"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-800"
                            required
                            onChange={onChangeValue}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        Register
                    </button>
                    <div className='text-center pt-3'>
                        <p>Have already an account ? <Link to={'/login'} className='font-bold underline'>Login here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
