import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddMenuItems() {
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        img: '',
        options: [{ size: '', price: '' }],
        description: '',
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        if (name === 'size' || name === 'price') {
            const updatedOptions = [...formData.options];
            updatedOptions[index][name] = value;
            setFormData(prev => ({ ...prev, options: updatedOptions }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const addOption = () => {
        setFormData(prev => ({
            ...prev,
            options: [...prev.options, { size: '', price: '' }],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE}/food_menu/add_menu`, formData);
            toast.success('Item added successfully!');
            console.log(response.data);
        } catch (error) {
            toast.warning(error?.response?.data?.error || 'Submission failed');
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center pt-8">
            <div className="w-full max-w-md p-8 text-gray-700 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Add Menu Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium">Category</label>
                        <input
                            type="text"
                            name="category"
                            id="category"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                            required
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="img" className="block text-sm font-medium">Image URL</label>
                        <input
                            type="text"
                            name="img"
                            id="img"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                            required
                            value={formData.img}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Options</label>
                        {formData.options.map((opt, index) => (
                            <div key={index} className="flex space-x-2 mt-2">
                                <input
                                    type="text"
                                    name="size"
                                    placeholder="Size (e.g., half', 'full', 'regular', 'medium', 'large)"
                                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                                    value={opt.size}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="Price"
                                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                                    value={opt.price}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                            </div>
                        ))}
                        Size : ['half', 'full', 'regular', 'medium', 'large']
                        <button
                            type="button"
                            onClick={addOption}
                            className="mt-2 text-blue-600 font-semibold underline"
                        >
                            + Add another option
                        </button>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                            rows="3"
                            required
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
