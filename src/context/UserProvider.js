import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
    const url = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser 
            ? JSON.parse(savedUser) 
            : { name: '', email: '', token: '', refreshToken: '', isLoggedIn: false };
    });

    // Automatically save user data to localStorage whenever user state changes
    useEffect(() => {
        if (user.isLoggedIn) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Function to refresh the token using the refresh token
    const refreshAccessToken = async () => {
        try {
            const response = await fetch(url + '/api/Auth/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: user.refreshToken,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser((prevUser) => ({
                    ...prevUser,
                    token: data.accessToken,
                    refreshToken: data.refreshToken,
                }));
            } else {
                console.error("Failed to refresh access token");
                setUser({ name: '', email: '', token: '', refreshToken: '', isLoggedIn: false });
            }
        } catch (error) {
            console.error("Error refreshing token", error);
        }
    };

    // Automatically refresh the token if it's about to expire
    useEffect(() => {
        if (user.isLoggedIn) {
            const tokenExpiry = parseJwt(user.token)?.exp;
            const tokenExpiryDate = new Date(tokenExpiry * 1000);

            // Refresh token 1 minute before expiry
            const timeout = setTimeout(() => {
                refreshAccessToken();
            }, tokenExpiryDate.getTime() - Date.now() - 60000);

            return () => clearTimeout(timeout);
        }
    }, [user.token]);

    // Helper function to parse JWT
    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Failed to parse JWT", error);
            return null;
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, refreshAccessToken }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
