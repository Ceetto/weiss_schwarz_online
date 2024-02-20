import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StatusBar} from '@capacitor/status-bar';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import "./variables.css";
import Register from "./Pages/Register";
import api from "./api/api";
import Play from "./Pages/Play";
import Decks from "./Pages/Decks";
import Profile from "./Pages/Profile";

function App() {
    useEffect(() => {
        document.title = "Weiss Schwarz Online"
    })

    useEffect(()=>{
        const hideStatusBar = async () => {
            try{
                await StatusBar.hide();
                api.defaults.baseURL = `//${process.env.REACT_APP_API_URL_EMULATOR}`
            } catch(err:any){
                console.log(err.toString())
            }

        };
        hideStatusBar();
    })

    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login/" element={<Login/>}/>
                    <Route path="/register/" element={<Register/>}/>
                    <Route path="/play/" element={<Play/>}/>
                    <Route path="/decks/" element={<Decks/>}/>
                    <Route path="/profile/" element={<Profile/>}/>
                </Routes>
            </BrowserRouter>
    );
}

export default App;
