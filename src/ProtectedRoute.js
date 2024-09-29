import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuth, redirectPath = "/", children }) {
    return isAuth ? children : <Navigate to={redirectPath} />;
}

export default ProtectedRoute;