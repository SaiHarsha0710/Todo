import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import About from './components/about/About';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Todo from './components/todo/Todo';
import Signup from './components/signup/Signup';
import Signin from './components/signup/Signin';
import { useDispatch } from "react-redux";
import {authActions} from "./store";
import Suggestions from './components/suggestion/Suggestion';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id=sessionStorage.getItem("id");
    if (id){
      dispatch(authActions.login());
    }
  }, [dispatch]);  
  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/suggestion" element={<Suggestions />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
    <Footer />
    </div>
  );
}

export default App;

