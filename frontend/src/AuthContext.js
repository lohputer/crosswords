import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    let [username, setUser] = useState('')
}

export default AuthContext;