import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from "../context/AuthContext.js" 

const PrivateRoute = ({children, ...rest}) => {
    let { user } = useContext(AuthContext);
    console.log(user);
    return user ? children : <Navigate to="/login" />;
}
export default PrivateRoute;