import React, { useEffect, useRef, useState } from 'react'
import { ImSpinner9 } from "react-icons/im";
import { useCart, useDispatchCart } from '../ContextReducer/ContextReducer';
import { toast } from 'react-toastify';

export default function Card({ menuItems, loading }) {


    const priceRef = useRef();

    let dispatch = useDispatchCart();
    let data = useCart();
    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(menuItems.options.length > 0 ? menuItems.options[0].price.toString() : '')
    const [size, setSize] = useState(menuItems.options.length > 0 ? menuItems.options[0].size.toString() : '')

    //Final Price
    let finalPrice = qty * parseInt(Number(price));

    // const handelAddToCart = async () => {

    //     let food = []
    //     for (const item of data) {
    //         if (item.name === menuItems.name) {
    //             food = item;
    //             break;
    //         }
    //     }

    //     if (food !== []) {
    //         if (food.size === size) {
    //             await dispatch({ type: "UPDATE", menuItems, qty, price })
    //             alert('Item was updated successfully!')

    //         } else if (food.size !== size) {
    //             await dispatch({ type: "ADD", menuItems, qty, price, size });
    //             console.log("Size different so simply ADD one more to the list")
    //             alert('Item was added successfully!')
    //             return;
    //         }
    //         return;
    //     }

    //     await dispatch({ type: "ADD", menuItems, qty, price, size });
    //     // console.log('Cart data :', data)

    //     if (!size) {
    //         alert("Please select a size!");
    //         return;
    //     }
    // };


    const handelAddToCart = async () => {
        let food = await data.find(item => item.name === menuItems.name && item.size === size);

        if (food) {
            // If item exists and size is same, update quantity
            await dispatch({ type: "UPDATE", id: menuItems._id, qty, price, size });
            toast.success('Item quantity was updated successfully!');
        } else {
            // If the item doesn't exist (or size is different), add a new item to the cart
            await dispatch({ type: "ADD", id: menuItems._id, img: menuItems.img, name: menuItems.name, qty, price, size });
            toast.success('Item was added successfully!');
            // console.log("MenuItems : ", menuItems._id, menuItems.img, menuItems.name, qty, price, size);
            console.log("MenuItems : ", menuItems);
        }
    };


    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])


    if (loading) {
        return (
            <div className='text-center text-lg text-blue-500 font-bold w-full'>
                <h1 className='flex items-center justify-center gap-2 p-6'>
                    <ImSpinner9 className='w-5 h-5 text-red-500 animate-spin' />
                    Loading...
                </h1>
            </div>
        )
    }


    return (
        <>
            <div key={menuItems._id} className="dark:shadow-white shadow-black shadow-md border border-slate-200 rounded-lg max-w-xs">
                <div className="relative h-52 m-2.5 transition-all duration-500 hover:scale-110 overflow-hidden text-black dark:text-white rounded-md shadow-md shadow-black dark:shadow-white">
                    <img src="NA" className='rounded-md w-full h-full object-cover' alt={menuItems.name} />
                </div>

                <div className="p-4 dark:text-white">
                    <h6 className="mb-2 text-xl font-semibold">{menuItems.name}</h6>
                    <p className="line-clamp-2 font-light">{menuItems.description}</p>
                </div>

                <div className="flex items-center justify-between gap-2 px-4 pb-4">
                    <select className="rounded-md w-full bg-green-600 font-bold  py-2 px-4  border border-white text-white"
                        onChange={(e) => setQty(e.target.value)}>
                        {Array.from({ length: 6 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>

                    <select
                        value={size}
                        className="w-full capitalize rounded-md border border-white p bg-green-600 font-bold py-2 px-4 text-white"
                        onChange={(e) => {
                            const selectedSize = e.target.value;
                            const selectedOption = menuItems.options.find(opt => opt.size === selectedSize);
                            setSize(selectedSize);
                            setPrice(selectedOption.price);
                        }}
                        ref={priceRef}
                    >
                        {menuItems.options.map((opt) => (
                            <option key={opt.size} value={opt.size}>
                                {opt.size} : ₹{opt.price}
                            </option>
                        ))}
                    </select>

                </div>
                <div className=" py-2 px-4 flex items-center justify-between">
                    <button className='rounded-md max-w-md bg-green-600 font-bold  border border-white py-2 px-4 text-white'
                        onClick={handelAddToCart}>
                        Add to Cart
                    </button>
                    <h1 className='rounded-md  font-bold  py-2 px-4 dark:text-white'>
                        Price : ₹{finalPrice}/-
                    </h1>
                </div>
            </div >
        </>
    )
}
