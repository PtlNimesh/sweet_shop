// src/pages/SweetList.jsx
import React, { useEffect, useState } from 'react';
import sweetApi from '../services/sweetApi';
import { Link } from 'react-router-dom';

function SweetList() {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSweets = async () => {
        try {
            const data = await sweetApi.getAllSweets();
            setSweets(data);
        } catch (err) {
            setError('Failed to fetch sweets..');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete sweet with ID: ${id}?`)) {
            try {
                await sweetApi.deleteSweet(id);
                setSweets(sweets.filter(sweet => sweet.id !== id));
            } catch (err) {
                alert('Failed to delete sweet.');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="text-center mt-8">Loading sweets...</div>;
    if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Sweet Inventory</h1>
            <div className="mb-4 text-right">
                <Link to="/add" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300">
                    Add New Sweet
                </Link>
            </div>
            {sweets.length === 0 ? (
                <p className="text-center text-gray-600">No sweets available. Add some!</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
                                <th className="py-3 px-6 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sweets.map((sweet) => (
                                <tr key={sweet.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6 whitespace-nowrap">{sweet.id}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{sweet.name}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{sweet.category}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">₹{sweet.price.toFixed(2)}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{sweet.quantity}</td>
                                    <td className="py-3 px-6 whitespace-nowrap text-center">
                                        <Link to={`/edit/${sweet.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                        <button onClick={() => handleDelete(sweet.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        {/* You'd add purchase/restock forms/modals here */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default SweetList;