import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="about d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="d-flex">
                    <h1>About Us</h1>
                </div>
                <p>
                    Welcome to the Todo Project! This project was built with a focus on keeping things simple and efficient. 
                    It's a full-stack application where the frontend is developed using React, providing a responsive and 
                    interactive user interface. The backend is powered by Node.js and Express, managing all the server-side 
                    logic, including handling CRUD operations for your tasks.
                </p>
                <p>
                    For data storage, MongoDB is used, which allows us to store your tasks in a flexible, JSON-like format. 
                    This ensures that your todo lists are safe and easily accessible anytime you need them.
                </p>
                <p>
                    The app also integrates user authentication, so your lists are personal and secure. Whether you're 
                    logging in or signing up, the app ensures that only you have access to your tasks. The project was designed 
                    to help you stay organized and productive, with a clean, user-friendly interface and reliable functionality.
                </p>
                <p>
                    To enhance user experience, we've implemented responsive design principles. The interface adapts to various 
                    screen sizes, ensuring that you can manage your tasks on any device, be it a phone, tablet, or desktop.
                </p>
                <p>
                    We’ve also focused on optimizing the performance of the application. By leveraging React’s state management 
                    and the efficiency of Node.js, the app provides fast and smooth interactions, even with large lists of tasks.
                </p>
                <p>
                    This project was a great learning experience, combining various technologies and concepts like RESTful APIs, 
                    asynchronous programming, and database management. We're excited to share it with you and hope it helps you 
                    stay on top of your tasks and deadlines!
                </p>
            </div>
        </div>
    );
}

export default About;
