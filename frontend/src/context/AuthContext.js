import { createContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom"
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState('');
    let [authToken, setAuthToken] = useState(() => (localStorage.getItem("token") ? localStorage.getItem("token") : null));
    const navigate = useNavigate();
    let loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {username: e.target.username.value, password: e.target.password.value});
            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token)
            setUser(e.target.username.value);
            navigate('/');
        } catch (err) {
            console.error(err.response.data);
            alert('Failed to login - wrong credentials');        
        }
    }

    let registerUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {username: e.target.username.value, password: e.target.password.value, email: e.target.email.value});
            console.log(res);
            navigate('/login');
        } catch (err) {
            console.error(err.response.data);
            console.log(err)
            alert('Failed to register');  
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