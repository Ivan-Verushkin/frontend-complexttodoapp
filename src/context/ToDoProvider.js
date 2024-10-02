import React, { createContext, useState, useEffect } from "react";

export const ToDoContext = createContext();

function ToDoProvider({ children }) {
    const url = process.env.REACT_APP_API_URL;
    const [toDoLists, setToDoLists] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));  // Parse the user object
    const token = user?.token;  // Get the token from the user object

    useEffect(() => {
        const fetchToDoLists = async () => {
            try {
                const response = await fetch(url + '/api/ToDo/todolists', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`  
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setToDoLists(data);
                } else {
                    console.error("Failed to fetch to-do lists");
                }
            } catch (error) {
                console.error("Error fetching to-do lists", error);
            }
        };

        fetchToDoLists();
    }, []);

    const addToDoList = async (toDoListName) => {
        try {
            const response = await fetch(url + '/api/ToDo/create-todo-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')?.token}`,
                },
                body: JSON.stringify({ toDoListName }),
            });

            if (response.ok) {
                const newToDoList = await response.json();
                setToDoLists((prevToDoLists) => [...prevToDoLists, newToDoList]);
            } else {
                console.error("Failed to add to-do list");
            }
        } catch (error) {
            console.error("Error adding to-do list", error);
        }
    };

    return (
        <ToDoContext.Provider value={{ toDoLists, setToDoLists, addToDoList }}>
            {children}
        </ToDoContext.Provider>
    );
}

export default ToDoProvider;
