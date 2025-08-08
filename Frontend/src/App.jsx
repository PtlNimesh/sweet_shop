// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SweetList from './pages/SweetList';
import SweetForm from './pages/SweetForm';
import './index.css'; 

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white shadow-md">
                    <div className="container mx-auto">
                        <h1 className="text-2xl font-semibold">Sweet Shop Management</h1>
                    </div>
                </nav>
                <main className="py-8">
                    <Routes>
                        <Route path="/" element={<SweetList />} />
                        <Route path="/add" element={<SweetForm />} />
                        <Route path="/edit/:id" element={<SweetForm />} />
                        
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;