import React from 'react'
import { useCart, useDispatchCart } from '../ContextReducer/ContextReducer'
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';


export default function Cart() {

    const data = useCart();
    console.log("UseCart data :", data)
    const dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div className='w-full flex justify-center'>
                <div className='m-5 w-full dark:text-white translate-y-full text-red-500 font-bold text-center text-2xl'>
                    The Cart is Empty!
                </div>
            </div>
        )
    }



    const handleCheckOut = async () => {
        try {
            let userEmail = localStorage.getItem("userEmail");
            // console.log(data,localStorage.getItem("userEmail"),new Date())
            let response = await axios.post(`${process.env.REACT_APP_API_BASE}/food_menu/orderData`, {
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            });

            console.log("JSON RESPONSE:::::", response.status)
            if (response.status === 200) {
                dispatch({ type: "DROP" })
            }
        } catch (error) {
            console.log('Internal Server Error :', error)
        }
    }

    let totalPrice = data.reduce((total, food) => total + Number(food.price), 0)
    // console.log('totalPrice : ', totalPrice)

    return (
        <>
            <div className='flex justify-center w-full'>
                <div className='overflow-auto w-full'>
                    <table className='table-auto text-left border-collapse w-full max-w-screen-2xl dark:text-white'>
                        <thead className='text-xl border-b-2 border-green-400/80 text-green-500/80'>
                            <tr>
                                <th className='font-extrabold p-2'>#</th>
                                <th className='font-extrabold p-2'>Name</th>
                                <th className='font-extrabold p-2'>Quantity</th>
                                <th className='font-extrabold p-2'>Option</th>
                                <th className='font-extrabold p-2'>Amount</th>
                                <th className='font-extrabold p-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg font-semibold capitalize'>
                            {data.map((food, index) => (

                                <tr key={index}>
                                    <td className='p-2'>{index + 1}</td>
                                    <td className='p-2'>{food.name}</td>
                                    <td className='p-2'>{food.qty}</td>
                                    <td className='p-2'>{food.size}</td>
                                    <td className='p-2'>{food.price}</td>
                                    <td className='p-2'>
                                        <button type='button' className='p-2'
                                            onClick={() => { dispatch({ type: 'REMOVE', index: index }) }}><FaTrashAlt className='w-5 h-5' /></button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>

                    <div className='dark:text-white mt-5 text-right'>
                        <h1 className='border px-4 py-0.5 shadow-black shadow-inner bg-green-500 hover:bg-green-500/80'>Total Price: ₹{totalPrice}/-</h1>
                    </div>
                    <div className='dark:text-white mt-5 px-6 text-right'>
                        <button className='border px-4 py-0.5 shadow-black shadow-inner bg-green-500 hover:bg-green-500/80'
                            onClick={handleCheckOut}>Check Out</button>
                    </div>
                </div>
            </div >
        </>
    )
}
