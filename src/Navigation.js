import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./SignIn";
import { UserContext } from "./UserProvider";
import { useContext } from "react";
import ProtectedRoute from "./ProtectedRoute";


function Navigation (){
    const {user, setUser} = useContext(UserContext);
    return (
        <>
            <Router>
            <nav className="navigation">
                <ul className="nav-left">
                    <li className="nav-li"><Link to='/'>Home</Link></li>
                    <li className="nav-li">Your ToDo</li>
                    <li className="nav-li">About</li>
                </ul>
                <ul className="nav-right">
                    {!user.isLoggedIn && (
                            <>
                                <li className="nav-li"><Link to="/signin">Sign in</Link></li>
                                <li className="nav-li">Sign up</li>
                            </>
                    )}
                     {user.isLoggedIn && (
                            <li className="nav-li" onClick={() => setUser({ name: '', password: '', isLoggedIn: false })}>
                                Logout
                            </li>
                    )}
                </ul>
            </nav>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route
                        path="/signin"
                        element={
                            <ProtectedRoute isAuth={!user.isLoggedIn} redirectPath="/">
                                <SignIn />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default Navigation;