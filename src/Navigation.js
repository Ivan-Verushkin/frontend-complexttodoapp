import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./SignIn";
import { UserContext } from "./context/UserProvider";
import { ToDoContext } from "./context/ToDoProvider";
import { useContext } from "react";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./SignUp";
import About from "./About";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import ToDoList from "./ToDoList";


function Navigation (){
    const {user, setUser} = useContext(UserContext);
    const {toDoLists, setToDoLists, addToDoList} = useContext(ToDoContext);
    return (
        <>
            <Router>
            <nav className="navigation">
                <ul className="nav-left">
                    <li className="nav-li"><Link to='/'>Home</Link></li>
                    <li className="nav-li"><Link to='/about'>About</Link></li>
                    {user.isLoggedIn && toDoLists.length > 0 && (
                        <>
                            {toDoLists.map((toDoList, index) => (
                                <li className="nav-li" key={index}><Link to={`/to-do/${index+1}`}>ToDo List {index+1} {toDoList.ToDoListName}</Link></li>
                            ))}
                        </>
                    )}
                    {user.isLoggedIn && 
                        <>
                            <li className="nav-li">
                                <Link to='/to-do'>Create ToDo List</Link>
                            </li>
                        </>
                    }
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
                                <Link to='/'>Logout</Link>
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
                    <Route 
                        path="/reset-password"
                        element={<ResetPassword/>}
                    />
                    <Route
                        path="/to-do/:id"
                        element={
                            <ProtectedRoute isAuth={user.isLoggedIn} redirectPath="/">
                                <ToDoList />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default Navigation;