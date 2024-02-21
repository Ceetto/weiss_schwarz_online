import React from "react";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Home from "./Home/Home";

import styles from "./Content.module.css"
import Profile from "./Profile/Profile";
import Decks from "./Decks/Decks";
import Play from "./Play/Play";
import Game from "./Play/Game";

interface ContentProps{
    screen: string,
}

function Content(props: ContentProps){
    switch(props.screen){
        case "login": {
            return (
                <div id={styles['main']}>
                    <Login></Login>
                </div>
            )
        }
        case "register": {
            return (
                <div id={styles['main']}>
                    <Register></Register>
                </div>
            )
        }
        case "home": {
            return (
                <div id={styles['main']}>
                    <Home></Home>
                </div>
            )
        }
        case "play": {
            return(
                <div id={styles['main']}>
                    <Play></Play>
                </div>
            )
        }
        case "decks": {
            return(
                <div id={styles['main']}>
                    <Decks></Decks>
                </div>
            )
        }
        case "profile": {
            return (
                <div id={styles['main']}>
                    <Profile></Profile>
                </div>
            )
        }
        case "game": {
            return (
                <div id={styles['main']}>
                    <Game></Game>
                </div>
            )
        }
        default: {
            return (
                <div id={styles['main']}>

                </div>
            )
        }
    }

}

export default Content;
