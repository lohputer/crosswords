import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <div className="vw-100 flex flex-row gap-5 justify-center items-center"> 
            {user ?
                <>
                    <Link to="/">Crosswords</Link>
                    <Link to="/create">Create :D</Link>
                    <Link onClick={logoutUser}>Logout</Link>
                </>
            : 
                <>
                    <Link class="flex" to="/">Crosswords</Link>
                    <Link class="flex" to="/register">Register</Link>
                    <Link class="flex" to="/login">Login</Link>
                </>
            } 
        </div>
    );
}
export default Header