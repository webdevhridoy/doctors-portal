import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { userSignOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSignOut = () => {
        userSignOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => console.log(error));
    };
    return (
        <div>
            <h2>Page Not Found: Funny 404 Error</h2>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h2>
                <li onClick={handleSignOut}><Link to='/signout'>Sign Out</Link></li>
            </h2>
        </div>
    );
};

export default DisplayError;