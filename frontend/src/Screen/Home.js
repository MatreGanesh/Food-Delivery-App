// import React, { useEffect, useState } from 'react';
// import Card from './Card';
// import Carousel from '../Components/Carousel';
// import axios from 'axios';
// import Categories from './Categories';

// export default function Home() {
//     const [search, setSearch] = useState('');
//     const [foodItems, setFoodItems] = useState([]);
//     // const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState([]); // show Burger by default
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchFoodItems = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_API_BASE}/food_menu/all_menu`);
//                 const [items] = response.data.data;
//                 setFoodItems(items);
//                 // console.log('Menu and Categories', items);
//             } catch (error) {
//                 console.error('Error fetching food items:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchFoodItems();
//     }, []);

//     // Filter by selected category + search
//     const searchLower = search.toLowerCase();

//     const filteredItems = foodItems.filter(
//         item =>
//             item.category === selectedCategory
//         // && item.name.toLowerCase().includes(searchLower)
//     );

//     return (
//         <div>
//             <Carousel search={search} setSearch={setSearch} />

//             {/* All Categories - always visible */}
//             <Categories setSelectedCategory={setSelectedCategory} />

//             <div className='dark:bg-gray-900 px-4 py-6'>
//                 <h2 className='text-2xl text-center font-bold text-gray-800 dark:text-white mb-6'>
//                     <span className='border-orange-500 border-b-4 pr-2 pb-1'>
//                         🍽️ {selectedCategory}
//                     </span>
//                 </h2>

//                 {filteredItems.length === 0 ? (
//                     <p className="text-center text-gray-500 dark:text-gray-300">
//                         No items found in this category.
//                     </p>
//                 ) : (
//                     <div className="w-full flex justify-center">
//                         <div className="flex flex-wrap justify-start gap-6 w-[95%]">
//                             {filteredItems.map((menuItem, index) => (
//                                 <Card key={menuItem._id || index} menuItems={menuItem} loading={loading} />
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


// // // Home.js
// // export default function Home() {
// //     const [search, setSearch] = useState("");
// //     const [foodItems, setFoodItems] = useState([]);
// //     const [categories, setCategories] = useState([]);
// //     const [selectedCategory, setSelectedCategory] = useState('Burger'); // NEW
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         const fetchFoodItems = async () => {
// //             try {
// //                 const response = await axios.get(`${process.env.REACT_APP_API_BASE}/food_menu/all_menu`);
// //                 const [items, cats] = response.data.data;
// //                 setFoodItems(items);
// //                 setCategories(cats);
// //             } catch (error) {
// //                 console.error('Error fetching food items:', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchFoodItems();
// //     }, []);

// //     return (
// //         <div>
// //             <Carousel search={search} setSearch={setSearch} />
// //             <Categories setSelectedCategory={setSelectedCategory} />


// //             <div className='dark:bg-gray-900 px-4 py-6'>
// //                 {
// //                     (selectedCategory ? categories.filter(c => c.categoryName === selectedCategory) : categories)
// //                         .map((category) => {
// //                             const searchLower = search.toLowerCase();

// //                             const itemsForCategory = foodItems.filter(item =>
// //                                 item.category === category.categoryName &&
// //                                 item.name.toLowerCase().includes(searchLower)
// //                             );

// //                             return (
// //                                 <div key={category._id} className='mb-10'>
// //                                     <h2 className='text-2xl text-center font-bold text-gray-800 dark:text-white mb-6'>
// //                                         <span className='border-orange-500 border-b-4 pr-2 pb-1'>🍽️ {category.categoryName}</span>
// //                                     </h2>

// //                                     {
// //                                         itemsForCategory.length === 0 ? (
// //                                             <p className="text-center text-gray-500 dark:text-gray-300">No items found in this category.</p>
// //                                         ) : (
// //                                             <div className="w-full flex justify-center">
// //                                                 <div className="flex flex-wrap justify-start gap-6 w-[95%]">
// //                                                     {itemsForCategory.map((menuItems, index) => (
// //                                                         <div key={menuItems._id || index}>
// //                                                             <Card menuItems={menuItems} loading={loading} />
// //                                                         </div>
// //                                                     ))}
// //                                                 </div>
// //                                             </div>
// //                                         )
// //                                     }
// //                                 </div>
// //                             );
// //                         })
// //                 }
// //             </div>
// //         </div>
// //     );
// // }


// // export default function Home() {

// //     const [search, setSearch] = useState(""); // <-- manage search here
// //     const [foodItems, setFoodItems] = useState([]);
// //     const [categories, setCategories] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         const fetchFoodItems = async () => {
// //             try {
// //                 const response = await axios.get(`${process.env.REACT_APP_API_BASE}/food_menu/all_menu`);
// //                 const [items, cats] = response.data.data;
// //                 setFoodItems(items);
// //                 setCategories(cats);
// //                 // console.log("Food items:", items);
// //                 // console.log("Categories:", cats);
// //             } catch (error) {
// //                 console.error('Error fetching food items:', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         }
// //         fetchFoodItems();
// //     }, []);
// //     return (
// //         <div className=''>
// //             <div>
// //                 <Carousel search={search} setSearch={setSearch} />
// //             </div>

// //             <div className=''>
// //                 <div className='dark:bg-gray-900 px-4 py-6'>
// //                     {categories.map((category) => {

// //                         const searchLower = search.toLowerCase();

// //                         const itemsForCategory = foodItems.filter(item => item.category === category.categoryName);

// //                         const filteredItems = itemsForCategory.filter(item =>
// //                             item.name.toLowerCase().includes(searchLower)
// //                         );

// //                         if (filteredItems.length === 0) {
// //                             return null;
// //                         }

// //                         return (
// //                             <div key={category._id} className='mb-10'>
// //                                 <h2 className='text-2xl text-center font-bold  text-gray-800 dark:text-white mb-6'>
// //                                     <span className='border-orange-500 border-b-4 pr-2 pb-1'>🍽️ {category.categoryName}</span>
// //                                 </h2>

// //                                 <div className="w-full flex justify-center">
// //                                     <div className="flex flex-wrap justify-start gap-6 w-[95%] ">
// //                                         {itemsForCategory.map((menuItems, index) => (
// //                                             <div key={menuItems._id || index}>
// //                                                 <Card menuItems={menuItems} loading={loading} />
// //                                             </div>
// //                                         ))}
// //                                     </div>
// //                                 </div>

// //                             </div>
// //                         );
// //                     })}
// //                 </div>
// //             </div>
// //             <Categories />
// //         </div>
// //     )
// // }


import React, { useEffect, useState } from 'react';
import Card from './Card';
import Carousel from '../Components/Carousel';
import axios from 'axios';
import Categories from './Categories';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodItems, setFoodItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE}/food_menu/all_menu`);
                const [items, cats] = response.data.data;
                setFoodItems(items);
                // Set default category (optional: first category)
                if (cats.length > 0) {
                    setSelectedCategory(cats[0].categoryName);
                }
            } catch (error) {
                console.error('Error fetching food items:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFoodItems();
    }, []);

    // Filter food items by selected category and search text
    const searchLower = search.toLowerCase();
    const filteredItems = foodItems.filter(
        item =>
            item.category === selectedCategory &&
            item.name.toLowerCase().includes(searchLower)
    );

    return (
        <div>
            <Carousel search={search} setSearch={setSearch} />

            {/* Category Selection */}
            <Categories setSelectedCategory={setSelectedCategory} />

            <div className='dark:bg-gray-900 px-4 py-6'>
                <h2 className='text-2xl text-center font-bold text-gray-800 dark:text-white mb-6'>
                    <span className='border-orange-500 border-b-4 pr-2 pb-1'>
                        🍽️ {selectedCategory}
                    </span>
                </h2>

                {filteredItems.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-300">
                        No items found in this category.
                    </p>
                ) : (
                    <div className="w-full flex justify-center">
                        <div className="flex flex-wrap justify-start gap-6 w-[95%]">
                            {filteredItems.map((menuItem, index) => (
                                <Card key={menuItem._id || index} menuItems={menuItem} loading={loading} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

