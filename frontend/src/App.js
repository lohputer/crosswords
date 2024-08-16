import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setLoggedInUser(null); 
    };
    return (
        <div className="App vw-100 vh-100 flex min-h-screen flex-col items-centers">
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Register />}></Route>
                <Route path="/logout" element={<Login />}></Route>
            </Routes>
        </div>
    );
};

export default App;

/**
 * 
 * {loggedInUser ? (
                    <div>
                        <p>Welcome {loggedInUser}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <Register />
                        <Login setLoggedInUser={setLoggedInUser} />
                    </div>
                )}
 */