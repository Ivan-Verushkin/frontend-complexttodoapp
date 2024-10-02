import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToDoContext } from "./context/ToDoProvider";

function ToDoList() {
    const { id } = useParams();
    const { toDoLists } = useContext(ToDoContext);
    const [toDos, setToDos] = useState([]);

    useEffect(() => {
        const selectedToDoList = toDoLists.find(list => list.id === parseInt(id)); // Find the ToDo list by id
        if (selectedToDoList && selectedToDoList.toDos) {
            console.log('Selected ToDo List:', selectedToDoList);
            setToDos(selectedToDoList.toDos);  // Set the ToDos from the selected ToDo list
        } else {
            console.log("No ToDos found for the selected list.");
            setToDos([]);  // Reset to empty if no ToDos are found
        }
    }, [id, toDoLists]);

    return (
        <div>
            <h2>ToDo List details:</h2>

            {toDos && toDos.length > 0 ? (
                <ul>
                    {toDos.map((toDo, index) => (
                        <li key={index}>{toDo.toDoText}</li>  // Display ToDo text
                    ))}
                </ul>
            ) : (
                <p>No todos yet!</p>
            )}
        </div>
    );
}

export default ToDoList;
