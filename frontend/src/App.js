import React, { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'
import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import CreatePage from './components/Create';

const App = () => {
    return (
        <div className="App vw-100 vh-100 flex min-h-screen flex-col items-centers">
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/create" element={<PrivateRoute><CreatePage /></PrivateRoute>}></Route>
                </Routes>
            </AuthProvider> 
        </div>
    );
};

export default App;
