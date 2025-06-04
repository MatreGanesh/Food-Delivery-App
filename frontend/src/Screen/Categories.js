import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImSpinner9 } from 'react-icons/im';


export default function Categories({ setSelectedCategory }) {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE}/food_menu/all_category`);
                // console.log("Category :", response.data.category)
                if (response.data.success) {
                    setCategory(response.data.category);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFoodItems();
    }, []);


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
        <div className='flex justify-center'>
            <div className='dark:text-white container p-5 space-y-5'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl font-bold dark:text-gray-200'>Food Menu</h1>
                </div>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    {category.map((item, index) => (
                        <div
                            key={item.categoryName || index}
                            className="flex flex-col items-center justify-center cursor-pointer"
                            onClick={() => setSelectedCategory(item.categoryName)}
                        >
                            <img
                                src={item.image}
                                alt={item.categoryName}
                                className="object-cover rounded-full w-24 h-24 border border-white"
                            />
                            <h1 className="text-center font-semibold text-lg">
                                {item.categoryName}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



// export default function Categories() {

//     const [category, setCategory] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchFoodItems = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_API_BASE}/food_menu/all_category`);
//                 console.log("Categories:", response.data.category);
//                 if (response.data.success === true) {
//                     const catData = response.data.category;
//                     setCategory(catData);
//                 }

//             } catch (error) {
//                 console.error('Error fetching food items:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchFoodItems();
//     }, []);

//     return (
//         <div className='flex justify-center'>
//             <div className='dark:text-white container p-5 space-y-5'>
//                 <div className='flex items-center justify-between'>
//                     <h1 className='text-xl font-bold dark:text-gray-200'>Food Menu</h1>
//                     <p className='text-sm text-orange-600 font-semibold'>See All</p>
//                 </div>
//                 <div className='flex flex-wrap items-center justify-between gap-2'>
//                     {
//                         category.map((item, index) => (
//                             <div key={item.categoryName || index} className="flex flex-col items-center justify-center cursor-pointer">
//                                 <img
//                                     src={item.image}
//                                     alt={item.categoryName}
//                                     className="object-cover rounded-full w-24 h-24 border border-white"
//                                 />
//                                 <h1 className="text-center font-semibold text-lg">{item.categoryName}</h1>
//                             </div>

//                         ))
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }
