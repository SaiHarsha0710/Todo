import React, { useState } from "react";
import "./Signin.css";
import HeadingComp from "./HeadingComp";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateEmail = (email) => {
        const re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return re.test(password);
    };

    const validate = () => {
        let tempErrors = {};
        if (!inputs.email) tempErrors.email = "Email is required";
        else if (!validateEmail(inputs.email)) tempErrors.email = "Email is not valid";
        
        if (!inputs.username) tempErrors.username = "Username is required";
        
        if (!inputs.password) tempErrors.password = "Password is required";
        else if (!validatePassword(inputs.password)) 
            tempErrors.password = "Password must be at least 8 characters long, contain at least one capital letter and one number";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const submit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post("http://localhost:1000/api/v1/register", inputs);
                if (response.data.message === "User Already Exists") {
                    alert(response.data.message);
                } else {
                    alert(response.data.message);
                    setInputs({
                        email: "",
                        username: "",
                        password: "",
                    });
                    history("/signin");
                }
            } catch (error) {
                console.error("There was an error registering!", error);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signup">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column w-100 p-5">
                            <input
                                className="input-signup"
                                type="email"
                                name="email"
                                placeholder="Enter your email:"
                                onChange={change}
                                value={inputs.email}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                            <input
                                className="input-signup"
                                type="text"
                                name="username"
                                placeholder="Enter your username:"
                                onChange={change}
                                value={inputs.username}
                            />
                            {errors.username && <p className="error">{errors.username}</p>}
                            <div className="password-input-wrapper">
                                <input
                                    className="password-input"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password:"
                                    onChange={change}
                                    value={inputs.password}
                                />
                                <button 
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="error">{errors.password}</p>}
                            <button className="btn-signup" onClick={submit}>Sign Up</button>
                            <p className="text-center mt-3">
                                Already have an account? <Link to="/signin">Sign in</Link>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-left column d-flex justify-content-center align-items-center">
                        <HeadingComp first="Sign" second="Up" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;