import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Login from "./Pages/Login";

function App() {
    useEffect(() => {
        document.title = "Weiss Schwarz Online"
    })

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="login/" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
