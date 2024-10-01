import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./SignIn";
import { UserContext } from "./context/UserProvider";
import { useContext } from "react";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./SignUp";
import About from "./About";
import ForgotPassword from "./ForgotPassword";


function Navigation (){
    const {user, setUser} = useContext(UserContext);
    return (
        <>
            <Router>
            <nav className="navigation">
                <ul className="nav-left">
                    <li className="nav-li"><Link to='/'>Home</Link></li>
                    {user.isLoggedIn && (
                            <li className="nav-li">
                                <Link to='/'>Your ToDo</Link>
                            </li>
                    )}
                    <li className="nav-li"><Link to='/about'>About</Link></li>
                </ul>
                <ul className="nav-right">
                    {!user.isLoggedIn && (
                            <>
                                <li className="nav-li"><Link to="/signin">Sign in</Link></li>
                                <li className="nav-li"><Link to="/signup">Sign up</Link></li>
                            </>
                    )}
                     {user.isLoggedIn && (
                            <li className="nav-li" onClick={() => setUser({ name: '', password: '', isLoggedIn: false })}>
                                <Link>Logout</Link>
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
                    <Route 
                        path="/signup"
                        element= {
                            <ProtectedRoute isAuth={!user.isLoggedIn} redirectPath="/">
                                <SignUp />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/about"
                        element={<About/>}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default Navigation;