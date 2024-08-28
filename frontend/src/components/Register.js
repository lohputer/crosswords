import React, { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext.js"

const Register = () => {
    let { registerUser } = useContext(AuthContext)
    return (
        <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={registerUser}>
            <input type="email" placeholder="Email" name="email" required />
                <input type="text" placeholder="Username" name="username" required />
                <input type="password" placeholder="Password" name="password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;