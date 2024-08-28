import React, { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext.js"

const Login = () => {
    let { loginUser } = useContext(AuthContext)
    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input type="text" 
                       placeholder="Username" 
                       name="username" 
                       required />
                <input type="password" 
                       placeholder="Password" 
                       name="password" 
                       required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;