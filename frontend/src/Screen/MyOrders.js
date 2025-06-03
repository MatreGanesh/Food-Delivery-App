import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOrder() {
    const [orderData, setorderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE}/food_menu/myOrderData`,
                { email: localStorage.getItem('userEmail') }
            );

            console.log(response.data);
            setorderData(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };


    useEffect(() => {
        fetchMyOrder();
    }, []);


    return (

        <div className="w-full  mx-auto px-4 py-6">
            {orderData?.orderData?.order_data?.length > 0 ? (
                orderData.orderData.order_data
                    .filter(orderArray => orderArray.length > 1) // skip malformed ones
                    .slice(0)
                    .reverse()
                    .map((orderArray, i) => {
                        const orderDate = orderArray[0]?.Order_date;
                        const items = orderArray.slice(1); // Skip the first item

                        return (
                            <div key={i} className="mb-6 w-full">
                                <div className="text-center mt-5 font-semibold text-lg dark:text-gray-400 text-gray-500">
                                    {orderDate}
                                    <hr className="my-2 border-t border-gray-300" />
                                </div>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {items.map((item, j) => (
                                        <div key={j} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2">
                                            <div className="bg-white shadow-md rounded-xl p-2 overflow-hidden transform transition duration-300 hover:scale-105">
                                                <img
                                                    // src={item.img || 'https://via.placeholder.com/150'}
                                                    src={'https://via.placeholder.com/150'}
                                                    alt={item.name}
                                                    className="w-full h-[150px] object-cover"
                                                />
                                                <div className="px-2 py-t pb-2">
                                                    <h5 className="text-lg font-bold">{item.name}</h5>
                                                    <div className="flex flex-wrap items-center pt-2 justify-between text-sm text-gray-600">
                                                        <p className='font-semibold'>
                                                            <span className='font-bold'>Qty:</span> {item.qty}
                                                        </p>
                                                        <p className='font-semibold capitalize'>
                                                            <span className='font-bold'>Size: </span> {item.size}
                                                        </p>
                                                        <p className='font-semibold capitalize text-green-600 text-lg'>
                                                            <span className='font-bold'>Price: </span>  ₹{item.price}/-
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })

            ) : (
                <div className="w-full flex justify-center">
                    <div className="m-5 text-red-500 font-bold text-center text-2xl">
                        My Order is Empty!
                    </div>
                </div>
            )}
        </div>

        // <div className="container mx-auto px-4 py-6">
        //     <div className="flex flex-wrap justify-center gap-6">
        //         {orderData?.orderData?.order_data?.length > 0 ? (
        //             Array(orderData).map((data, index) => (
        //                 data.orderData ? (
        //                     data.orderData.order_data.slice(0).reverse().map((item, i) => (
        //                         item.map((arrayData, j) => (
        //                             <div key={`${i}-${j}`} className="w-full ">
        //                                 {arrayData.Order_date ? (
        //                                     <div className="text-center mt-5 font-semibold text-lg text-gray-700">
        //                                         {data = arrayData.Order_date}
        //                                         <hr className="my-2 border-t border-gray-300" />
        //                                     </div>
        //                                 ) : (
        //                                     <div className=''>
        //                                         <div className="w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 ">
        //                                             <div className="bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:scale-105">
        //                                                 <img
        //                                                     src={arrayData.img}
        //                                                     alt="..."
        //                                                     className="w-full h-32 object-cover"
        //                                                 />
        //                                                 <div className="p-4">
        //                                                     <h5 className="text-lg font-bold mb-2">{arrayData.name}</h5>
        //                                                     <div className="flex flex-wrap justify-between text-sm text-gray-600">
        //                                                         <span className="mr-2">Qty: {arrayData.qty}</span>
        //                                                         <span className="mr-2">Size: {arrayData.size}</span>
        //                                                         <span className="mr-2">Date: {data}</span>
        //                                                     </div>
        //                                                     <div className="mt-2 text-lg font-semibold text-green-600">
        //                                                         ₹{arrayData.price}/-
        //                                                     </div>
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 )}
        //                             </div>
        //                         ))
        //                     ))
        //                 ) : null
        //             ))
        //         ) :
        //             (
        //                 <div className='w-full flex justify-center'>
        //                     <div className='m-5 w-full dark:text-white translate-y-full text-red-500 font-bold text-center text-2xl'>
        //                         My Order is Empty!
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </div>
        // </div>
    );
}
