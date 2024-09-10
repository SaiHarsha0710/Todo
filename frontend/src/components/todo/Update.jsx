import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Todo.css';

const API_BASE_URL = 'http://localhost:1000/api/v2';

const Update = ({ display, update, onUpdateTask }) => {
    const [inputs, setInputs] = useState({
        title: '',
        body: ''
    });

    useEffect(() => {
        if (update) {
            setInputs({
                title: update.title || '',
                body: update.body || ''
            });
        }
    }, [update]);

    const change = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const submit = async () => {
        // Check if title or body is empty
        if (!inputs.title.trim() || !inputs.body.trim()) {
            toast.error("Title and body cannot be empty!");
            return;
        }

        try {
            const response = await axios.put(`${API_BASE_URL}/updateTask/${update._id}`, {
                title: inputs.title,
                body: inputs.body
            });
            
            if (response.data.list) {
                toast.success("Task updated successfully");
                onUpdateTask(response.data.list);  // Pass updated task to parent component
                display();  // Hide the update form after successful update
            } else {
                toast.error("Failed to update task. Please try again.");
            }
        } catch (error) {
            console.error("Error updating task:", error.response?.data || error.message);
            toast.error("Failed to update task. Please try again.");
        }
    };

    return (
        <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
            <h3>Update Your Task</h3>
            <input 
                type="text" 
                className="todo-inputs my-4 w-100 p-3" 
                value={inputs.title} 
                name="title" 
                onChange={change} 
                placeholder="Enter task title"
            />
            <textarea 
                className="todo-inputs w-100 p-3" 
                value={inputs.body} 
                name="body" 
                onChange={change} 
                placeholder="Enter task description"
            />
            <div>
                <button className="btn btn-dark my-4" onClick={submit}>Update</button>
                <button className="btn btn-danger my-4 mx-3" onClick={display}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Update;