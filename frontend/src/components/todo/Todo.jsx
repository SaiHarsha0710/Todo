import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoCards from './TodoCards';
import Update from './Update';
import './Todo.css';

const API_BASE_URL = 'http://localhost:1000/api/v2';

const Todo = () => {
    const [inputs, setInputs] = useState({ title: '', body: '' });
    const [tasks, setTasks] = useState([]);
    const [userId, setUserId] = useState(sessionStorage.getItem("id"));
    const [showUpdate, setShowUpdate] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    const show = () => {
        document.getElementById('textarea').style.display = 'block';
    };
    console.log(setUserId);

    useEffect(() => {
        if (userId) {
            fetchTasks();
        }
    }, [userId]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getTasks/${userId}`);
            setTasks(response.data.list || []);
        } catch (error) {
            console.error("Error fetching tasks:", error.response?.data || error.message);
            if (error.response?.status === 404) {
                setTasks([]);
            } else {
                toast.error("Failed to fetch tasks. Please try again.");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!userId) {
            toast.error("You need to sign in first.");
            return;
        }

        if (!inputs.title || !inputs.body) {
            toast.error('Title and Body are required');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/addTask`, {
                title: inputs.title,
                body: inputs.body,
                id: userId
            });
            setTasks(prev => [response.data.list, ...prev]);
            setInputs({ title: '', body: '' });
            toast.success("Task added successfully");
        } catch (error) {
            console.error("Error adding task:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to add task. Please try again.");
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`${API_BASE_URL}/deleteTask/${taskId}`, {
                data: { id: userId }
            });
            setTasks(prev => prev.filter(task => task._id !== taskId));
            toast.success("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task:", error.response?.data || error.message);
            toast.error("Failed to delete task. Please try again.");
        }
    };

    const toggleUpdate = (task) => {
        setShowUpdate(prev => !prev);
        setTaskToUpdate(task);
        console.log("Update toggled:", task);
    };

    const updateTask = (updatedTask) => {
        setTasks(prevTasks => prevTasks.map(task => 
            task._id === updatedTask._id ? updatedTask : task
        ));
        setShowUpdate(false);
        setTaskToUpdate(null);
        console.log("Task updated:", updatedTask);
    };
    

    return (
        <div className="todo">
            <ToastContainer />
            <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                <div className="d-flex flex-column todo-inputs-div w-50 p-1">
                    <input
                        type="text"
                        placeholder="Title"
                        className="my-2 p-2 todo-inputs"
                        name="title"
                        onClick={show}
                        value={inputs.title}
                        onChange={handleChange}
                    />
                    <textarea
                        id="textarea"
                        type="text"
                        placeholder="Body"
                        name="body"
                        className="p-2 todo-inputs"
                        value={inputs.body}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-50 d-flex justify-content-end my-3">
                    <button className="home-btn px-2 py-1" onClick={handleSubmit}>Add</button>
                </div>
            </div>
            <div className="todo-body">
                <div className="container-fluid">
                    <div className="row">
                        {tasks.map((task) => (
                            <div className="col-lg-3 col-10 mx-5 my-2" key={task._id}>
                                <TodoCards
                                    title={task.title}
                                    body={task.body}
                                    id={task._id}
                                    onDelete={handleDelete}
                                    onUpdate={() => toggleUpdate(task)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showUpdate && taskToUpdate && (
                <div className="todo-update">
                    <div className="update">
                        <Update 
                            display={() => setShowUpdate(false)}
                            update={taskToUpdate}
                            onUpdateTask={updateTask}
                        />
                    </div>
                </div>
            )}

        </div>
        
    );
};

export default Todo;
