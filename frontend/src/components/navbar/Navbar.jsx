
import React from 'react';
import "./Navbar.css";
import { GiWhiteBook } from "react-icons/gi";
import { useNavigate,Link } from "react-router-dom";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import {authActions} from "../../store";


const Navbar = () =>{
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const logout = () =>{
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    navigate("/signin");
  }

  return <div><nav className="navbar navbar-expand-lg ">
  <div className="container">
    <Link className="navbar-brand" to="/todo"><b>
    <GiWhiteBook /> &nbsp; TODO</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2 tr">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>

        

        <li className="nav-item mx-2 tr">
          <Link className="nav-link active" aria-current="page" to="/about">About us</Link>
        </li>

        <li className="nav-item mx-2 tr">
          <Link className="nav-link active" aria-current="page" to="/todo">Todo</Link>
        </li>

        <li className="nav-item mx-2 tr">
          <Link className="nav-link active" aria-current="page" to="/suggestion">Suggestions</Link>
        </li>
        
        
                
        {!isLoggedIn && (
            <>
              <li className="nav-item mx-2 tr1">
                <Link className="nav-link active btn-nav" aria-current="page" to="/signup">SIGNUP</Link>
              </li>
              <li className="nav-item mx-2 tr1">
                <Link className="nav-link active btn-nav" aria-current="page" to="/signin">SIGNIN</Link>
              </li>
            </>
        )}
        {isLoggedIn && (
            <li className="nav-item mx-2 tr1" onClick={logout}>
              <Link className="nav-link active btn-nav" aria-current="page" to="]/signin" >Log out</Link>
                  
            </li>
        )}
            
      </ul>
      
    </div>
  </div>
</nav></div>;
};

export default Navbar;























/*import React from 'react';
import "./Navbar.css";
import { GiWhiteBook } from "react-icons/gi";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import {authActions} from "../../store";

const Navbar = () =>{
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const logout = () =>{
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  }
  return <div><nav className="navbar navbar-expand-lg ">
  <div className="container">
    <Link className="navbar-brand" to="#"><b>
    <GiWhiteBook /> &nbsp; TODO</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>

        <li className="nav-item mx-2">
          <Link className="nav-link active" aria-current="page" to="/about">About us</Link>
        </li>

        <li className="nav-item mx-2">
          <Link className="nav-link active" aria-current="page" to="/todo">Todo</Link>
        </li>
        
        {!isLoggedIn && (
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link active btn-nav" aria-current="page" to="/signup">SIGNUP</Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link active btn-nav" aria-current="page" to="/signin">SIGNIN</Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li className="nav-item mx-2" onClick={logout}>
                  <Link className="nav-link active btn-nav" aria-current="page" to="#" >Log out</Link>
                  
                </li>
              )}
      </ul>
      
    </div>
  </div>
</nav></div>;
};

export default Navbar;*/