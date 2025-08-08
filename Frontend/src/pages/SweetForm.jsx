// src/pages/SweetForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import sweetApi from '../services/sweetApi';

function SweetForm() {
    const { id } = useParams(); // Get ID from URL for edit mode
    const navigate = useNavigate();
    const [sweet, setSweet] = useState({
        id: '',
        name: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            const fetchSweet = async () => {
                try {
                    const data = await sweetApi.getSweetById(id);
                    setSweet(data);
                } catch (err) {
                    setError('Sweet not found or failed to fetch for editing.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchSweet();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSweet(prevSweet => ({
            ...prevSweet,
            [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isEditMode) {
                await sweetApi.updateSweet(id, sweet);
                alert('Sweet updated successfully!');
            } else {
                await sweetApi.addSweet(sweet);
                alert('Sweet added successfully!');
            }
            navigate('/'); // Navigate back to the list
        } catch (err) {
            setError(err.response?.data || 'An error occurred.');
            console.error(err.response);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div className="text-center mt-8">Loading sweet details for editing...</div>;
    if (error && isEditMode) return <div className="text-center mt-8 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-lg mt-8">
            <h1 className="text-2xl font-bold mb-6 text-center">{isEditMode ? 'Edit Sweet' : 'Add New Sweet'}</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={sweet.id}
                        onChange={handleChange}
                        required
                        readOnly={isEditMode} // ID should not be editable after creation
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={sweet.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={sweet.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={sweet.price}
                        onChange={handleChange}
                        required
                        min="0.01"
                        step="0.01"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={sweet.quantity}
                        onChange={handleChange}
                        required
                        min="0"
                        step="1"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update Sweet' : 'Add Sweet')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SweetForm;