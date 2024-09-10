import React, { useState } from "react";
import "./Signin.css";
import HeadingComp from "./HeadingComp.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotPassword, setForgotPassword] = useState("");
    const [showForgotPasswordField, setShowForgotPasswordField] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleForgotPasswordVisibility = () => {
        setShowForgotPasswordField(!showForgotPasswordField);
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return re.test(password);
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:1000/api/v1/signin", inputs);
            if (response.data && response.data._id) {
                sessionStorage.setItem("id", response.data._id);
                dispatch(authActions.login());
                history("/todo");
            } else {
                toast.error("Check your details once again and try once more.");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    toast.error("User not found. Please sign up first.");
                } else if (error.response.status === 401) {
                    toast.error("Incorrect password. Please try again.");
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            } else if (error.request) {
                toast.error("No response from server. Please try again later.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        let tempErrors = {};

        if (!forgotEmail) tempErrors.forgotEmail = "Email is required";
        if (!forgotPassword) tempErrors.forgotPassword = "Password is required";
        else if (!validatePassword(forgotPassword)) 
            tempErrors.forgotPassword = "Password must be at least 8 characters long, contain at least one capital letter and one number";
        
        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:1000/api/v1/reset-password", {
                    email: forgotEmail,
                    newPassword: forgotPassword
                });
                if (response.data && response.data.message) {
                    toast.success(response.data.message);
                } else {
                    toast.success("Password updated successfully. Please sign in with your new password.");
                }
                setShowForgotPassword(false);
                setForgotEmail("");
                setForgotPassword("");
                setErrors({});
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            }
        }
    };

    return (
        <div className="signup">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-left column d-flex justify-content-center align-items-center">
                        <HeadingComp first="Sign" second="In" />
                    </div>
                    <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column w-100 p-5">
                            <input
                                className="p-2 my-3 input-signup"
                                type="email"
                                name="email"
                                placeholder="Enter your email:"
                                onChange={change}
                                value={inputs.email}
                            />
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
                            <button className="btn-signup p-2" onClick={submit}>Sign In</button>
                            <div className="d-flex justify-content-between mt-3">
                                <button onClick={() => setShowForgotPassword(true)} className="btn btn-link">Forgot Password?</button>
                                <Link to="/signup">New Registration? Please Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showForgotPassword && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Reset Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            className="p-2 my-3 input-signup"
                        />
                        {errors.forgotEmail && <p className="error">{errors.forgotEmail}</p>}
                        <div className="password-input-wrapper">
                            <input
                                className="password-input"
                                type={showForgotPasswordField ? "text" : "password"}
                                placeholder="Enter new password"
                                value={forgotPassword}
                                onChange={(e) => setForgotPassword(e.target.value)}
                            />
                            <button 
                                type="button"
                                className="password-toggle-btn"
                                onClick={toggleForgotPasswordVisibility}
                            >
                                {showForgotPasswordField ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                        {errors.forgotPassword && <p className="error">{errors.forgotPassword}</p>}
                        <button onClick={handleForgotPassword} className="btn-signup p-2">Submit</button>
                        <button onClick={() => {
                            setShowForgotPassword(false);
                            setErrors({});
                            setForgotEmail("");
                            setForgotPassword("");
                            setShowForgotPasswordField(false);
                        }} className="btn btn-link mt-3">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signin;