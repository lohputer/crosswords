import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState('');
    let [authToken, setAuthToken] = useState(() => (localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null));
    let loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {username: e.target.username.value, password: e.target.password.value});
            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token)
            setUser(res.data);
        } catch (err) {
            console.error(err.response.data);
            alert('Failed to login - wrong credentials');        
        }
    }

    let registerUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {username: e.target.username.value, password: e.target.password.value});
        } catch (err) {
            console.error(err.response.data);
            alert('Failed to register, User already exists');  
        }
    }

    let logoutUser = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
        setUser(null);
    }

    let contextData = {
        user: user,
        authToken: authToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContext;