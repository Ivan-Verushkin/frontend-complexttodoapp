import React from "react";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

function Home(){
    const {user} = useContext (UserContext);
    return ( 
        <>
            {user && user.name && <p>Welcome, {user.name}</p>}
            {!user.isLoggedIn && <p>Please sign in!</p>}
        </>
    );
}

export default Home;