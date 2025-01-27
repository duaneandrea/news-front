import { Navigate } from 'react-router-dom';
import * as React from "react";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
