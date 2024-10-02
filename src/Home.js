import React from "react";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import { Link } from "react-router-dom";

function Home(){
    const {user} = useContext (UserContext);
    return ( 
        <div id='home-container'>
            <div id='home-text'>
                <div>
                    <h1 className="welcome-header"> Welcome to the To Do app</h1>
                    <p className="welcome-header-low">A place where you can manage your future tasks</p>
                </div>
                <div className="home-content">
                    {user && user.name && <p>Welcome, {user.name}</p>}
                    {!user.isLoggedIn && <p>Before we are able to start... Please <Link to='/signin'>sign in!</Link></p>}
                </div>
            </div>
        </div>
    );
}

export default Home;