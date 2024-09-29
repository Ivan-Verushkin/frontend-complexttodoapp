import React from "react";
import { createContext } from "react";
import { useState, useEffect  } from "react";

export const UserContext = createContext();

function UserProvider ({children}) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : { name: '', email: '', password: '', passwordConfirm: '', isLoggedIn: false };
    });
    useEffect(() => {
        // Save user state to localStorage whenever it changes
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;