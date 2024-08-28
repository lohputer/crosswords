import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext'

const Home = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <div>This is you home page. <h1>{user}</h1></div>
    );
}
export default Home