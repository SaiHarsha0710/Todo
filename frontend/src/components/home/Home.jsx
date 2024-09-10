import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/todo');
    };

    return (
        <div className="home d-flex justify-content-center align-items-center">
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <h1 className="text-center">
                    Master Your Day <br/> Achieve More.
                </h1>
                <p>
                    Effortlessly manage tasks and goals. Stay on top of your to-dos, <br />
                    boost productivity, and reduce stress with the ultimate task manager.
                </p>
                <button className="home-btn" onClick={handleButtonClick}>
                    Make Todo List
                </button>
            </div>
        </div>
    );
};

export default Home;
